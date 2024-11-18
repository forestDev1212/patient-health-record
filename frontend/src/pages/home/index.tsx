import React, { useState } from "react";
import DailyLogForm from "@/components/Log/DailyLogForm";
import LogsTable from "@/components/Log/LogsTable";
import Login from "@/components/auth/Login";

const Home: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);

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
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg shadow mr-4"
          >
            Create Log
          </button>
          <Login />
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        {showForm && (
          <DailyLogForm
            onSubmit={(log) => {
              handleAddLog(log);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}
        <LogsTable
          logs={logs}
          onEdit={handleEditLog}
          onDelete={handleDeleteLog}
        />
      </main>
    </div>
  );
};

export default Home;
