import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogs } from '../features/logs/logsSlice';
import { addFeedback } from '../features/feedback/feedbackSlice';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState('');
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch();
  const { logs } = useSelector((state) => state.logs);

  // Mock users data
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];

  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchLogs(selectedUser));
    }
  }, [dispatch, selectedUser]);

  const handleSubmitFeedback = async () => {
    if (!selectedUser || !feedback.trim()) {
      return toast.error('Please select a user and enter feedback');
    }
    try {
      await dispatch(addFeedback({ userId: selectedUser, message: feedback })).unwrap();
      toast.success('Feedback sent successfully');
      setFeedback('');
    } catch (err) {
      toast.error('Failed to send feedback');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            rows="4"
            placeholder="Enter feedback for the user"
          ></textarea>
        </div>

        <button
          onClick={handleSubmitFeedback}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send Feedback
        </button>
      </div>

      {selectedUser && logs.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exercise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{log.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.exerciseType} ({log.duration} min)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.caloriesBurned} kcal | BP: {log.bloodPressure} | HR: {log.heartRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}