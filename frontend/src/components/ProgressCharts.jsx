import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

export default function ProgressCharts() {
  const { logs } = useSelector((state) => state.logs);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Weight Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={logs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (kg)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Calories Burned</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={logs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="caloriesBurned" fill="#82ca9d" name="Calories (kcal)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}