// import API from './api';

// export const getTasks = (groupId) => API.get(`/tasks?groupId=${groupId}`);
// export const createTask = (data) => API.post('/tasks', data);
// export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
// export const deleteTask = (id) => API.delete(`/tasks/${id}`);


import API from './api';

export const getTasks = (groupId) =>
  API.get('/tasks', { params: { group: groupId } });


export const createTask = (data) => API.post('/tasks', data);

export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

