import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
              <p className="text-3xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Tasks Completed</h2>
              <p className="text-3xl font-bold text-green-600">18</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Overdue Tasks</h2>
              <p className="text-3xl font-bold text-red-600">3</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
