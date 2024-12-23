import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addLog } from '../features/logs/logsSlice';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function ExerciseForm() {
  const [formData, setFormData] = useState({
    day: DAYS_OF_WEEK[0],
    exerciseType: '',
    duration: '',
    caloriesBurned: '',
    bloodPressure: '',
    heartRate: '',
    weight: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addLog({ ...formData, date: new Date().toISOString() })).unwrap();
      toast.success('Exercise log added successfully!');
      setFormData({
        day: DAYS_OF_WEEK[0],
        exerciseType: '',
        duration: '',
        caloriesBurned: '',
        bloodPressure: '',
        heartRate: '',
        weight: ''
      });
    } catch (err) {
      toast.error('Failed to add exercise log');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Day</label>
        <select
          value={formData.day}
          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        >
          {DAYS_OF_WEEK.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Exercise Type</label>
        <input
          type="text"
          value={formData.exerciseType}
          onChange={(e) => setFormData({ ...formData, exerciseType: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Calories Burned</label>
          <input
            type="number"
            value={formData.caloriesBurned}
            onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
          <input
            type="text"
            value={formData.bloodPressure}
            onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            placeholder="120/80"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Heart Rate (BPM)</label>
          <input
            type="number"
            value={formData.heartRate}
            onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Log Exercise
      </button>
    </form>
  );
}

export default ExerciseForm