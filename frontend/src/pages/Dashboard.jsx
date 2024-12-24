import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../features/logs/logsSlice";
import { fetchFeedbacks } from "../features/feedback/feedbackSlice";
import ExerciseForm from "../components/ExerciseForm";
import LogsTable from "../components/LogsTable";
import ProgressCharts from "../components/ProgressCharts";
import Feedbacks from "../components/Feedbacks";
import { logout } from "../features/auth/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { feedback } = useSelector((state) => state.feedback);

  // State for toggling ExerciseForm visibility
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchLogs());
      dispatch(fetchFeedbacks());
    }
  }, [dispatch, user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex w-100 justify-between mb-5 border-b-2 alig items-center">
        <h1 className="text-3xl font-bold ">Fitness Dashboard</h1>
        <div className="flex space-x-4">
          {/* Logout Button */}
          <button
            onClick={() => dispatch(logout())}
            className="rounded-xl hover:bg-rose-400 p-4 font-bold text-white bg-rose-900 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Conditionally render Feedbacks */}
      {feedback.length > 0 ? (
        <div className="flex justify-center flex-col">
          {showFeedbacks && <Feedbacks feedbacks={feedback} />}
          {/* Button to toggle Feedbacks */}
          <button
            onClick={() => setShowFeedbacks((prev) => !prev)}
            className="my-3 rounded-xl hover:bg-blue-400 p-4 font-bold text-white bg-blue-900 shadow-lg"
          >
            {showFeedbacks ? "Hide Feedbacks" : "Show Feedback"}
          </button>
        </div>
      ) : (
        <div
          onClick={() => setShowFeedbacks((prev) => !prev)}
          className="my-3 rounded-xl hover:bg-slate-400 p-4 font-bold text-slate-900 bg-slate-300 shadow-lg"
        >
          No Feedbacks Yet
        </div>
      )}

      {/* Conditionally render  ExerciseForm*/}
      <div className="flex justify-center flex-col">
        {showExerciseForm && <ExerciseForm />}
        {/* Button to toggle ExerciseForm */}
        <button
          onClick={() => setShowExerciseForm((prev) => !prev)}
          className="my-3 rounded-xl hover:bg-blue-400 p-4 font-bold text-white bg-blue-900 shadow-lg"
        >
          {showExerciseForm ? "Cancel Adding Exercise" : "Add Exercise"}
        </button>
      </div>
      <LogsTable />
      <ProgressCharts />
    </div>
  );
}
