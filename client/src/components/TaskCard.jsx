// function TaskCard({ task, onEdit, onDelete }) {
//   return (
//     <div className="bg-white p-4 rounded shadow border">
//       <h2 className="text-xl font-semibold">{task.title}</h2>
//       <p className="text-sm text-gray-600">{task.description}</p>
//       <div className="flex gap-2 mt-2">
//         <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//           {task.status}
//         </span>
//         <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//           {task.priority}
//         </span>
//       </div>
//       <div className="mt-4 flex gap-2">
//         <button
//           onClick={() => onEdit(task)}
//           className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(task._id)}
//           className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TaskCard;



import { Draggable } from '@hello-pangea/dnd';

function TaskCard({ task, onEdit, onDelete, index, isDraggable }) {
  const card = (
    <div className="bg-white p-4 rounded shadow border">
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex gap-2 mt-2">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {task.status}
        </span>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          {task.priority}
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );

  if (!isDraggable) return card;

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card}
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
