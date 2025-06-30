import { useState } from 'react';

function ReminderForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    title: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-2xl mb-4">Add Reminder</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Reminder Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="datetime-local"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReminderForm;
