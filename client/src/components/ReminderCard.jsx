function ReminderCard({ reminder, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow border hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{reminder.title}</h2>
      {reminder.description && (
        <p className="text-sm text-gray-600 mb-1">{reminder.description}</p>
      )}
      <p className="text-sm text-gray-600">
        Due: {new Date(reminder.dueDate).toLocaleString()}
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => onEdit(reminder)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(reminder._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ReminderCard;
