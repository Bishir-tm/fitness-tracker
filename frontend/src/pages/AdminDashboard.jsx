import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeedback } from "../features/feedback/feedbackSlice";
import { toast } from "react-toastify";
import { fetchLogsById } from "../features/logs/logsSlice";
import { fetchAllUsers } from "../features/auth/authSlice";
import { logout } from "../features/auth/authSlice";

export default function AdminDashboard() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const { logsById } = useSelector((state) => state.logs);
  const { allUsers } = useSelector((state) => state.auth);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchLogsById(selectedUserId));
    }

    dispatch(fetchAllUsers(selectedUserId));
  }, [dispatch, selectedUserId]);

  const handleUpdateRole = async () => {
    if (!selectedUserId || !role) {
      return toast.error("Please select a user and a role");
    }

    try {
      await dispatch(updateRole({ userId: selectedUserId, role })).unwrap();
      toast.success("Role updated successfully");
      setRole("");
    } catch (err) {
      toast.error("Failed to update role");
    }
  };
  const handleSubmitFeedback = async () => {
    if (!selectedUserId || !feedback.trim()) {
      return toast.error("Please select a user and enter feedback");
    }
    try {
      await dispatch(
        addFeedback({ userId: selectedUserId, message: feedback })
      ).unwrap();
      toast.success("Feedback sent successfully");
      setFeedback("");
    } catch (err) {
      toast.error("Failed to send feedback");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex w-100 justify-between">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <button
          onClick={() => dispatch(logout())}
          className="rounded-xl hover:bg-rose-400  p-4 mb-8 font-bold text-white bg-rose-900 shadow-lg "
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select User
          </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          >
            <option value="">--- Select a user ---</option>
            {allUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white my-10 rounded-lg shadow p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Set Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          >
            <option value="">--- Select a role ---</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            {/* Add other roles as needed */}
          </select>
        </div>

        <button
          onClick={handleUpdateRole}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Change Role
        </button>
      </div>

      {selectedUserId && logsById.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exercise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logsById.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{log.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.exerciseType} ({log.duration} min)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.caloriesBurned} kcal | BP: {log.bloodPressure} | HR:{" "}
                    {log.heartRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-white my-10 rounded-lg shadow p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Feedback
          </label>
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
    </div>
  );
}
