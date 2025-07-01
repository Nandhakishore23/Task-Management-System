import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { fetchHeatmapData } from '../services/analyticsService';
import { useGroup } from '../context/GroupContext';
import dayjs from 'dayjs';

function TaskHeatmap() {
  const { currentGroup } = useGroup();
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const loadHeatmap = async () => {
      if (!currentGroup) return;
      const res = await fetchHeatmapData(currentGroup._id);
      const data = Object.entries(res.data).map(([date, count]) => ({
        date,
        count,
      }));
      setHeatmapData(data);
    };
    loadHeatmap();
  }, [currentGroup]);

  if (!currentGroup) {
    return <div className="text-lg">Select a group to view heatmap</div>;
  }

  const today = dayjs().toDate();
  const yearAgo = dayjs().subtract(1, 'year').toDate();

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Task Completion Heatmap</h2>
      <CalendarHeatmap
        startDate={yearAgo}
        endDate={today}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          if (value.count >= 5) {
            return 'color-github-4';
          } else if (value.count >= 3) {
            return 'color-github-3';
          } else if (value.count >= 1) {
            return 'color-github-2';
          }
          return 'color-empty';
        }}
        tooltipDataAttrs={(value) =>
          value.date
            ? {
                'data-tip': `${value.date}: ${value.count} tasks`,
              }
            : { 'data-tip': 'No tasks' }
        }
        showWeekdayLabels
      />
    </div>
  );
}

export default TaskHeatmap;
