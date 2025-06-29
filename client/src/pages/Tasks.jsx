import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { useGroup } from '../context/GroupContext';

function Tasks() {
  const { currentGroup } = useGroup(); // 🔥 Get current group
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const loadTasks = async () => {
    if (!currentGroup) return; // 🔥 No group, no tasks
    const res = await getTasks(currentGroup._id);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, [currentGroup]); // 🔥 Reload when group changes

  const handleCreate = async (task) => {
    await createTask({ ...task, groupId: currentGroup._id }); // 🔥 Attach groupId
    loadTasks();
  };

  const handleEdit = async (task) => {
    await updateTask(task._id, { ...task, groupId: currentGroup._id });
    setEditTask(null);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Tasks</h1>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              + Add Task
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => {
                  setEditTask(t);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      </div>

      {showForm && (
        <TaskForm
          onClose={() => {
            setShowForm(false);
            setEditTask(null);
          }}
          onSubmit={editTask ? handleEdit : handleCreate}
          initialData={editTask}
        />
      )}
    </div>
  );
}

export default Tasks;
