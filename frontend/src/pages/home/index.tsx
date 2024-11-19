import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DailyLogForm from "@/components/Log/DailyLogForm";
import LogsTable from "@/components/Log/LogsTable";
import Login from "@/components/auth/Login";
import Chart from "@/components/Log/Chart";

const testLogs = [
  { date: "2024-11-01", moodRating: 7, stressLevel: 4 },
  { date: "2024-11-02", moodRating: 8, stressLevel: 3 },
  { date: "2024-11-08", moodRating: 6, stressLevel: 5 },
  { date: "2024-11-15", moodRating: 9, stressLevel: 2 },
  { date: "2024-11-22", moodRating: 5, stressLevel: 6 },
  { date: "2024-11-30", moodRating: 7, stressLevel: 3 },
];

const Home: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Fetch logs for the authenticated user
  useEffect(() => {
    const fetchLogs = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/logs/${user.id}`
          );
          setLogs(response.data.payload); // Assuming logs are in `payload`
        } catch (error) {
          console.error("Error fetching logs:", error);
        }
      }
    };

    fetchLogs();
  }, [isAuthenticated, user]);

  const handleAddLog = (log: any) => {
    setLogs([...logs, log]);
  };

  const handleEditLog = (index: number, updatedLog: any) => {
    const updatedLogs = [...logs];
    updatedLogs[index] = updatedLog;
    setLogs(updatedLogs);
  };

  const handleDeleteLog = (index: number) => {
    setLogs(logs.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patient Health Record</h1>
        <div>
          <Login />
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        <div>
          <button
            onClick={() => setShowForm(true)}
            disabled={!isAuthenticated}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg shadow mr-4"
          >
            Create Log
          </button>
        </div>
        {showForm && (
          <DailyLogForm
            onSubmit={(log) => {
              handleAddLog(log);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}
        {!showForm && (
          <>
            <Chart logs={testLogs} />
            <LogsTable
              logs={logs}
              onEdit={handleEditLog}
              onDelete={handleDeleteLog}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
