import API from "./api";


// ✔️ Group CRUD
export const createGroup = (data) => API.post('/groups', data);
export const getGroups = () => API.get('/groups');
export const getGroup = (id) => API.get(`/groups/${id}`);
// Optional (if you want update/delete)
export const updateGroup = (id, groupData) => API.put(`/groups/${id}`, groupData);
export const deleteGroup = (id) => API.delete(`/groups/${id}`);

// ✔️ Group Members
export const addMember = (id, email) => API.post(`/groups/${id}/add-member`, { email });
export const removeMember = (id, email) => API.post(`/groups/${id}/remove-member`, { email });

// Group APIs
// export const getGroups = () => API.get('/groups');
// export const createGroup = (groupData) => API.post('/groups', groupData);
// export const updateGroup = (id, groupData) => API.put(`/groups/${id}`, groupData);
// export const deleteGroup = (id) => API.delete(`/groups/${id}`);


