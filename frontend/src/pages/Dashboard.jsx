import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '../features/logs/logsSlice';
import ExerciseForm from '../components/ExerciseForm';
import LogsTable from '../components/LogsTable';
import ProgressCharts from '../components/ProgressCharts';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchLogs(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Fitness Dashboard</h1>
      <ExerciseForm />
      <LogsTable />
      <ProgressCharts />
    </div>
  );
}