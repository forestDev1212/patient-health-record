import React from "react";

interface LogsTableProps {
  logs: any[];
  onEdit: (index: number, updatedLog: any) => void;
  onDelete: (index: number) => void;
}

const LogsTable: React.FC<LogsTableProps> = ({ logs, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-8 rounded shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Logs</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500">No logs available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {Object.keys(logs[0]).map((key, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                {Object.values(log).map((value, idx) => (
                  <td
                    key={idx}
                    className="border border-gray-300 px-4 py-2 text-gray-700"
                  >
                    {value as React.ReactNode}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => onEdit(index, log)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogsTable;
