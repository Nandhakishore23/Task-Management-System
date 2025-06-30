import API from './api';

export const getReminders = (groupId) =>
  API.get('/reminders', { params: { group: groupId } });

export const createReminder = (data) =>
  API.post('/reminders', data);

export const deleteReminder = (id) =>
  API.delete(`/reminders/${id}`);
