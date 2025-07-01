import API from './api';

export const fetchHeatmapData = (groupId) =>
  API.get('/analytics/heatmap', { params: { group: groupId } });

export const fetchProductivityStats = (groupId) =>
  API.get('/analytics/stats', { params: { group: groupId } });
