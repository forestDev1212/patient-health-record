import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Log {
  date: string; // Date in ISO string format (for daily logs)
  key?: string; // Group key for weekly/monthly data
  moodRating: number;
  stressLevel: number;
}

interface GroupedLog {
  date?: string; // Date in ISO string format (for daily logs)
  key: string; // Group key for weekly/monthly data
  moodRating: number; // Average mood rating for the group
  stressLevel: number; // Average stress level for the group
}

interface ChartProps {
  logs: Log[];
}

const Chart: React.FC<ChartProps> = ({ logs }) => {
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");

  // Group logs by week or month
  const groupLogsBy = (period: "weekly" | "monthly"): GroupedLog[] => {
    const grouped: { [key: string]: Log[] } = {};

    logs.forEach((log) => {
      const date = new Date(log.date);
      const key =
        period === "weekly"
          ? `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}` // Group by week (year + week number)
          : `${date.getFullYear()}-${date.getMonth() + 1}`; // Group by month (year + month)

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(log);
    });

    return Object.entries(grouped).map(([key, values]) => ({
      key,
      moodRating:
        values.reduce((sum, log) => sum + log.moodRating, 0) / values.length, // Average mood rating
      stressLevel:
        values.reduce((sum, log) => sum + log.stressLevel, 0) / values.length, // Average stress level
    }));
  };

  // Filter logs based on the selected view
  const filteredLogs =
    view === "daily"
      ? logs
      : groupLogsBy(view === "weekly" ? "weekly" : "monthly");

  // Prepare data for the chart
  const labels = filteredLogs.map((log) =>
    view === "daily" ? log.date : log.key
  ); // Use `date` for daily and `key` for grouped logs
  const moodRatings = filteredLogs.map((log) =>
    view === "daily" ? log.moodRating : log.moodRating
  ); // Mood ratings for y-axis
  const stressLevels = filteredLogs.map((log) =>
    view === "daily" ? log.stressLevel : log.stressLevel
  ); // Stress levels for y-axis

  const data = {
    labels, // X-axis labels
    datasets: [
      {
        label: "Mood Rating",
        data: moodRatings,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Stress Level",
        data: stressLevels,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Position of the legend
      },
      title: {
        display: true,
        text: `Mood and Stress Trends (${view
          .charAt(0)
          .toUpperCase()}${view.slice(1)})`, // Title of the chart
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow my-6">
      {/* View Selector */}
      <div className="flex justify-end mb-4">
        {["daily", "weekly", "monthly"].map((option) => (
          <button
            key={option}
            onClick={() => setView(option as "daily" | "weekly" | "monthly")}
            className={`px-4 py-2 rounded ${
              view === option
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800"
            } mx-2`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* Bar Chart */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
