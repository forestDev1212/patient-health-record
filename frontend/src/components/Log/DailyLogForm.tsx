import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface DailyLogFormProps {
  onSubmit: (log: any) => void; // Callback after successful submission
  onCancel: () => void; // Callback to cancel the form
}

const DailyLogForm: React.FC<DailyLogFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Default to today's date
    moodRating: 5, // Default to 5 (neutral mood)
    anxietyLevel: "",
    sleepHours: "",
    sleepQuality: "",
    physicalActivity: "",
    socialInteractions: "",
    stressLevel: "",
    symptoms: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state

  const { user } = useSelector((state: RootState) => state.auth);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    console.log("Log submitted:");
    try {
      // Replace with the actual userId

      if (user) {
        // Send POST request to the backend
        const response = await axios.post("http://localhost:3000/api/v1/logs", {
          ...formData,
          userId: user.id,
        });

        // Pass the saved log back to the parent component
        onSubmit(response.data.payload);
      }
    } catch (err: any) {
      console.error("Error saving log:", err);
      setError(
        err.response?.data?.message || "An error occurred while saving the log."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="bg-white p-8 rounded shadow-lg w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Daily Log Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Date Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Mood Rating Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mood Rating (1–10)
          </label>
          <input
            type="number"
            name="moodRating"
            value={formData.moodRating}
            onChange={handleChange}
            min="1"
            max="10"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Anxiety Level Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Anxiety Level
          </label>
          <input
            type="number"
            name="anxietyLevel"
            value={formData.anxietyLevel}
            onChange={handleChange}
            min="0"
            max="10"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Sleep Hours Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sleep Hours
          </label>
          <input
            type="number"
            name="sleepHours"
            value={formData.sleepHours}
            onChange={handleChange}
            min="0"
            max="24"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Sleep Quality Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sleep Quality
          </label>
          <select
            name="sleepQuality"
            value={formData.sleepQuality}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Quality</option>
            <option value="Poor">Poor</option>
            <option value="Average">Average</option>
            <option value="Good">Good</option>
          </select>
        </div>

        {/* Physical Activity Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Physical Activity (hours)
          </label>
          <input
            type="number"
            name="physicalActivity"
            value={formData.physicalActivity}
            onChange={handleChange}
            min="0"
            max="24"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Social Interactions Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Social Interactions (frequency)
          </label>
          <input
            type="number"
            name="socialInteractions"
            value={formData.socialInteractions}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Stress Level Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stress Level (1–10)
          </label>
          <input
            type="number"
            name="stressLevel"
            value={formData.stressLevel}
            onChange={handleChange}
            min="1"
            max="10"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Symptoms of Depression/Anxiety Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Symptoms of Depression/Anxiety
          </label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Describe symptoms"
          />
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DailyLogForm;
