import React, { useEffect, useState } from 'react';
import { fetchProductivityStats } from '../services/analyticsService';
import { useGroup } from '../context/GroupContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';

function ProductivityDashboard() {
  const { currentGroup } = useGroup();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      if (!currentGroup) return;
      const res = await fetchProductivityStats(currentGroup._id);
      setStats(res.data);
    };
    loadStats();
  }, [currentGroup]);

  if (!currentGroup) {
    return <div className="text-lg">Select a group to view productivity stats</div>;
  }

  if (!stats) {
    return <div>Loading...</div>;
  }

  const monthlyData = Object.entries(stats.monthlyCompleted).map(([month, count]) => ({
    month,
    count,
  }));

  const completionRate = stats.totalTasks
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Productivity Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks per Month */}
        <div>
          <h3 className="text-xl mb-2">Tasks Completed per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Rate */}
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="text-xl mb-2">Completion Rate</h3>
          <p className="text-4xl font-bold">{completionRate}%</p>
          <p className="text-gray-600">
            {stats.completedTasks} out of {stats.totalTasks} tasks completed
          </p>
        </div>

        {/* Overdue Count */}
        <div className="bg-red-50 p-4 rounded">
          <h3 className="text-xl mb-2">Overdue Tasks</h3>
          <p className="text-4xl font-bold">{stats.overdueCount}</p>
          <p className="text-gray-600">Tasks past due date</p>
        </div>
      </div>
    </div>
  );
}

export default ProductivityDashboard;
