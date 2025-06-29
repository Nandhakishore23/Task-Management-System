import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

function KanbanColumn({ columnId, title, tasks, onEdit, onDelete }) {
  return (
    <div className="bg-gray-100 rounded p-4 flex flex-col min-h-[500px]">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-4 flex-1 p-2 rounded ${
              snapshot.isDraggingOver ? 'bg-blue-100' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                index={index}
                isDraggable
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default KanbanColumn;
