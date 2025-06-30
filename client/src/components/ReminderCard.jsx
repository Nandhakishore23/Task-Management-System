function ReminderCard({ reminder, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow border">
      <h2 className="text-lg font-semibold">{reminder.title}</h2>
      <p className="text-sm text-gray-600">
        Due: {new Date(reminder.dueDate).toLocaleString()}
      </p>
      <div className="mt-4 flex justify-end">
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
