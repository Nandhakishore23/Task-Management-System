import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';
import { useEffect, useState } from 'react';
import { getTasks, updateTask, deleteTask } from '../services/taskService';
import { useGroup } from '../context/GroupContext';

const columns = ['Todo', 'In Progress', 'In Review', 'Completed'];

function KanbanBoard() {
  const { currentGroup } = useGroup(); // 🔥 Get current group
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    if (!currentGroup) return; // 🔥 Wait until a group is selected
    const res = await getTasks(currentGroup._id); // 🔥 Pass groupId
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, [currentGroup]); // 🔥 Reload when group changes

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find((t) => t._id === draggableId);
    if (task) {
      const updatedTask = { ...task, status: destination.droppableId };
      await updateTask(draggableId, updatedTask);
      loadTasks();
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col}
            columnId={col}
            title={col}
            tasks={tasks.filter((task) => task.status === col)}
            onEdit={(task) => console.log('Edit', task)}
            onDelete={async (id) => {
              await deleteTask(id);
              loadTasks();
            }}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
