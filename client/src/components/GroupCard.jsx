function GroupCard({ group, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow border">
      <h2 className="text-xl font-semibold">{group.name}</h2>
      <p className="text-sm text-gray-600">Members: {group.members.length}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(group)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(group._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default GroupCard;
