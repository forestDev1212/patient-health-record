import React, { useState } from "react";

interface DailyLogFormProps {
  onSubmit: (log: any) => void;
  onCancel: () => void;
}

const DailyLogForm: React.FC<DailyLogFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    moodRating: "",
    anxietyLevel: "",
    sleepHours: "",
    sleepQuality: "",
    physicalActivity: "",
    socialInteractions: "",
    stressLevel: "",
    symptoms: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Daily Log Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields */}
        {Object.keys(formData).map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}

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
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DailyLogForm;
