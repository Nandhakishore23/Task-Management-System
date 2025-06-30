// // import { DragDropContext } from '@hello-pangea/dnd';
// // import KanbanColumn from './KanbanColumn';
// // import { useEffect, useState } from 'react';
// // import { getTasks, updateTask, deleteTask } from '../services/taskService';
// // import { useGroup } from '../context/GroupContext';

// // const columns = ['Todo', 'In Progress', 'In Review', 'Completed'];

// // function KanbanBoard() {
// //   const { currentGroup } = useGroup(); // 🔥 Get current group
// //   const [tasks, setTasks] = useState([]);

// //   const loadTasks = async () => {
// //     if (!currentGroup) return; // 🔥 Wait until a group is selected
// //     const res = await getTasks(currentGroup._id); // 🔥 Pass groupId
// //     setTasks(res.data);
// //   };

// //   useEffect(() => {
// //     loadTasks();
// //   }, [currentGroup]); // 🔥 Reload when group changes

// //   const onDragEnd = async (result) => {
// //     const { destination, source, draggableId } = result;

// //     if (!destination) return;
// //     if (
// //       destination.droppableId === source.droppableId &&
// //       destination.index === source.index
// //     ) {
// //       return;
// //     }

// //     const task = tasks.find((t) => t._id === draggableId);
// //     if (task) {
// //       const updatedTask = { ...task, status: destination.droppableId };
// //       await updateTask(draggableId, updatedTask);
// //       loadTasks();
// //     }
// //   };

// //   return (
// //     <DragDropContext onDragEnd={onDragEnd}>
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         {columns.map((col) => (
// //           <KanbanColumn
// //             key={col}
// //             columnId={col}
// //             title={col}
// //             tasks={tasks.filter((task) => task.status === col)}
// //             onEdit={(task) => console.log('Edit', task)}
// //             onDelete={async (id) => {
// //               await deleteTask(id);
// //               loadTasks();
// //             }}
// //           />
// //         ))}
// //       </div>
// //     </DragDropContext>
// //   );
// // }

// // export default KanbanBoard;



// import { useEffect, useState } from 'react';
// import { DragDropContext } from '@hello-pangea/dnd';
// import KanbanColumn from '../components/KanbanColumn';
// import {
//   getTasks,
//   createTask,
//   updateTask,
//   deleteTask,
// } from '../services/taskService';
// import { useGroup } from '../context/GroupContext';

// const columns = ['Todo', 'In Progress', 'In Review', 'Completed'];

// function KanbanBoard() {
//   const { currentGroup } = useGroup(); // ✅ Get selected group from context
//   const [tasks, setTasks] = useState([]);

//   // ✅ Load tasks for current group
//   const loadTasks = async () => {
//     if (!currentGroup) {
//       setTasks([]); // If no group, show empty
//       return;
//     }
//     try {
//       const res = await getTasks(currentGroup._id);
//       setTasks(res.data);
//     } catch (error) {
//       console.error('Failed to load tasks', error);
//     }
//   };

//   useEffect(() => {
//     loadTasks();
//   }, [currentGroup]);

//   // ✅ Handle drag and drop
//   const onDragEnd = async (result) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) return;
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const task = tasks.find((t) => t._id === draggableId);
//     if (task) {
//       const updatedTask = { ...task, status: destination.droppableId };
//       await updateTask(draggableId, updatedTask);
//       loadTasks();
//     }
//   };

//   // ✅ Create a quick task
//   const handleCreateTask = async () => {
//     if (!currentGroup) {
//       alert('Please select a group first!');
//       return;
//     }

//     const newTask = {
//       title: 'New Task',
//       description: 'Description here...',
//       status: 'Todo',
//       priority: 'Medium',
//       group: currentGroup._id, // ✅ Link to the selected group
//     };

//     try {
//       await createTask(newTask);
//       loadTasks();
//     } catch (error) {
//       console.error('Failed to create task', error);
//     }
//   };

//   // ✅ Delete task
//   const handleDelete = async (id) => {
//     try {
//       await deleteTask(id);
//       loadTasks();
//     } catch (error) {
//       console.error('Failed to delete task', error);
//     }
//   };

//   // ✅ Handle no group selected
//   if (!currentGroup) {
//     return (
//       <div className="p-6">
//         <h2 className="text-2xl font-bold">
//           Please select a group first to view or manage tasks.
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">
//           {currentGroup.name} - Kanban Board
//         </h2>
//         <button
//           onClick={handleCreateTask}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + New Task
//         </button>
//       </div>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {columns.map((col) => (
//             <KanbanColumn
//               key={col}
//               columnId={col}
//               title={col}
//               tasks={tasks.filter((task) => task.status === col)}
//               onEdit={(task) => console.log('Edit', task)}
//               onDelete={handleDelete}
//             />
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }

// export default KanbanBoard;

import { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from '../components/KanbanColumn';
import TaskForm from '../components/TaskForm';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskService';
import { useGroup } from '../context/GroupContext';

const columns = ['Todo', 'In Progress', 'In Review', 'Completed'];

function KanbanBoard() {
  const { currentGroup } = useGroup();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // ✅ Load tasks for current group
  const loadTasks = async () => {
    if (!currentGroup) {
      setTasks([]);
      return;
    }
    try {
      const res = await getTasks(currentGroup._id);
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [currentGroup]);

  // ✅ Handle drag and drop
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

  // ✅ Handle create or update task
  const handleSubmit = async (data) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, {
          ...data,
          group: currentGroup._id,
        });
      } else {
        await createTask({ ...data, group: currentGroup._id });
      }
      setShowForm(false);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      console.error('Error saving task', error);
    }
  };

  // ✅ Handle delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  // ✅ If no group selected
  if (!currentGroup) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">
          Please select a group first to view or manage tasks.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {currentGroup.name} - Kanban Board
        </h2>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col) => (
            <KanbanColumn
              key={col}
              columnId={col}
              title={col}
              tasks={tasks.filter((task) => task.status === col)}
              onEdit={(task) => {
                setEditingTask(task);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DragDropContext>

      {showForm && (
        <TaskForm
          initialData={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default KanbanBoard;
