// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';

// function Dashboard() {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="flex-1 p-6">
//           <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white p-6 rounded shadow">
//               <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
//               <p className="text-3xl font-bold text-blue-600">24</p>
//             </div>
//             <div className="bg-white p-6 rounded shadow">
//               <h2 className="text-xl font-semibold mb-2">Tasks Completed</h2>
//               <p className="text-3xl font-bold text-green-600">18</p>
//             </div>
//             <div className="bg-white p-6 rounded shadow">
//               <h2 className="text-xl font-semibold mb-2">Overdue Tasks</h2>
//               <p className="text-3xl font-bold text-red-600">3</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useGroup } from '../context/GroupContext';
import { getTasks } from '../services/taskService';
import dayjs from 'dayjs';

function Dashboard() {
  const { currentGroup } = useGroup();
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    if (!currentGroup) {
      setTasks([]);
      return;
    }
    try {
      const res = await getTasks(currentGroup._id);
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [currentGroup]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const overdueTasks = tasks.filter(
    (t) => t.dueDate && dayjs(t.dueDate).isBefore(dayjs()) && t.status !== 'Completed'
  ).length;

  if (!currentGroup) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h2 className="text-2xl font-semibold">
          🚀 Please select a group first to view dashboard.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">
            Dashboard - {currentGroup.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
              <p className="text-3xl font-bold text-blue-600">{totalTasks}</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Tasks Completed</h2>
              <p className="text-3xl font-bold text-green-600">
                {completedTasks}
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Overdue Tasks</h2>
              <p className="text-3xl font-bold text-red-600">
                {overdueTasks}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
