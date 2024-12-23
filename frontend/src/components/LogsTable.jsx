import { useSelector } from 'react-redux';

export default function LogsTable() {
  const { logs } = useSelector((state) => state.logs);

  return (
    <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exercise Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BP</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="px-6 py-4 whitespace-nowrap">{log.day}</td>
              <td className="px-6 py-4 whitespace-nowrap">{log.exerciseType}</td>
              <td className="px-6 py-4 whitespace-nowrap">{log.duration} min</td>
              <td className="px-6 py-4 whitespace-nowrap">{log.caloriesBurned} kcal</td>
              <td className="px-6 py-4 whitespace-nowrap">{log.bloodPressure}</td>
              <td className="px-6 py-4 whitespace-nowrap">{log.heartRate} bpm</td>
              <td className="px-6 py-4 whitespace-nowrap">{log.weight} kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}