// // import { useEffect, useState } from 'react';
// // import { getGroups, createGroup, updateGroup, deleteGroup } from '../services/groupService';
// // import Navbar from '../components/Navbar';
// // import Sidebar from '../components/Sidebar';
// // import GroupCard from '../components/GroupCard';
// // import GroupForm from '../components/GroupForm';

// // function Groups() {
// //   const [groups, setGroups] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editGroup, setEditGroup] = useState(null);

// //   const loadGroups = async () => {
// //     const res = await getGroups();
// //     setGroups(res.data);
// //   };

// //   useEffect(() => {
// //     loadGroups();
// //   }, []);

// //   const handleCreate = async (group) => {
// //     await createGroup(group);
// //     loadGroups();
// //   };

// //   const handleEdit = async (group) => {
// //     await updateGroup(group._id, group);
// //     setEditGroup(null);
// //     loadGroups();
// //   };

// //   const handleDelete = async (id) => {
// //     await deleteGroup(id);
// //     loadGroups();
// //   };

// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col">
// //         <Navbar />
// //         <main className="flex-1 p-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <h1 className="text-3xl font-bold">Groups</h1>
// //             <button
// //               onClick={() => setShowForm(true)}
// //               className="px-4 py-2 bg-blue-600 text-white rounded"
// //             >
// //               + Add Group
// //             </button>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {groups.map((group) => (
// //               <GroupCard
// //                 key={group._id}
// //                 group={group}
// //                 onEdit={(g) => {
// //                   setEditGroup(g);
// //                   setShowForm(true);
// //                 }}
// //                 onDelete={handleDelete}
// //               />
// //             ))}
// //           </div>
// //         </main>
// //       </div>
// //       {showForm && (
// //         <GroupForm
// //           onClose={() => {
// //             setShowForm(false);
// //             setEditGroup(null);
// //           }}
// //           onSubmit={editGroup ? handleEdit : handleCreate}
// //           initialData={editGroup}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default Groups;


// import { useEffect, useState } from 'react';
// import {
//   createGroup,
//   getGroups,
//   addMember,
//   removeMember,
// } from '../services/groupService';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import { useGroup } from '../context/GroupContext';

// function Groups() {
//   const { setCurrentGroup } = useGroup();
//   const [groups, setGroups] = useState([]);
//   const [groupName, setGroupName] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [inviteEmail, setInviteEmail] = useState('');
//   const [removeEmail, setRemoveEmail] = useState('');

//   const loadGroups = async () => {
//     try {
//       const res = await getGroups();
//       setGroups(res.data);
//     } catch (error) {
//       console.error('Failed to fetch groups:', error);
//     }
//   };

//   useEffect(() => {
//     loadGroups();
//   }, []);

//   const handleCreateGroup = async () => {
//     if (!groupName) return;
//     try {
//       await createGroup({ name: groupName, description });
//       setGroupName('');
//       setDescription('');
//       loadGroups();
//     } catch (error) {
//       console.error('Failed to create group:', error);
//     }
//   };

//   const handleAddMember = async () => {
//     if (!selectedGroup || !inviteEmail) return;
//     try {
//       await addMember(selectedGroup._id, inviteEmail);
//       setInviteEmail('');
//       loadGroups();
//     } catch (error) {
//       console.error('Failed to add member:', error);
//     }
//   };

//   const handleRemoveMember = async () => {
//     if (!selectedGroup || !removeEmail) return;
//     try {
//       await removeMember(selectedGroup._id, removeEmail);
//       setRemoveEmail('');
//       loadGroups();
//     } catch (error) {
//       console.error('Failed to remove member:', error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <Navbar />
//         <div className="p-6">
//           <h1 className="text-3xl font-bold mb-6">Group Management</h1>

//           {/* Create Group */}
//           <div className="bg-white p-4 rounded shadow mb-6">
//             <h2 className="text-xl font-semibold mb-4">Create Group</h2>
//             <div className="flex gap-4">
//               <input
//                 className="border p-2 flex-1 rounded"
//                 placeholder="Group Name"
//                 value={groupName}
//                 onChange={(e) => setGroupName(e.target.value)}
//               />
//               <input
//                 className="border p-2 flex-1 rounded"
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                 onClick={handleCreateGroup}
//               >
//                 Create
//               </button>
//             </div>
//           </div>

//           {/* Manage Members */}
//           <div className="bg-white p-4 rounded shadow mb-6">
//             <h2 className="text-xl font-semibold mb-4">Manage Members</h2>

//             <select
//               className="border p-2 rounded w-full mb-4"
//               value={selectedGroup?._id || ''}
//               onChange={(e) => {
//                 const group = groups.find((g) => g._id === e.target.value);
//                 setSelectedGroup(group);
//                 setCurrentGroup(group);
//               }}
//             >
//               <option value="">Select Group</option>
//               {groups.map((group) => (
//                 <option key={group._id} value={group._id}>
//                   {group.name}
//                 </option>
//               ))}
//             </select>

//             <div className="flex gap-4 mb-4">
//               <input
//                 className="border p-2 flex-1 rounded"
//                 placeholder="Invite Member by Email"
//                 value={inviteEmail}
//                 onChange={(e) => setInviteEmail(e.target.value)}
//               />
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//                 onClick={handleAddMember}
//               >
//                 Add Member
//               </button>
//             </div>

//             <div className="flex gap-4">
//               <input
//                 className="border p-2 flex-1 rounded"
//                 placeholder="Remove Member by Email"
//                 value={removeEmail}
//                 onChange={(e) => setRemoveEmail(e.target.value)}
//               />
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//                 onClick={handleRemoveMember}
//               >
//                 Remove Member
//               </button>
//             </div>
//           </div>

//           {/* List Groups */}
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
//             <ul className="space-y-2">
//               {groups.map((group) => (
//                 <li
//                   key={group._id}
//                   className="p-3 border rounded hover:bg-blue-50 cursor-pointer"
//                   onClick={() => {
//                     setSelectedGroup(group);
//                     setCurrentGroup(group);
//                   }}
//                 >
//                   <strong>{group.name}</strong> - {group.description}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Groups;


import { useEffect, useState } from 'react';
import {
  createGroup,
  getGroups,
  addMember,
  removeMember,
} from '../services/groupService';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
import { useGroup } from '../context/GroupContext';

function Groups() {
  const { setCurrentGroup } = useGroup();
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [removeEmail, setRemoveEmail] = useState('');

  const loadGroups = async () => {
    try {
      const res = await getGroups();
      setGroups(res.data);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleCreateGroup = async () => {
    if (!groupName) return;
    try {
      await createGroup({ name: groupName, description });
      setGroupName('');
      setDescription('');
      loadGroups();
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };

  const handleAddMember = async () => {
    if (!selectedGroup || !inviteEmail) return;
    try {
      await addMember(selectedGroup._id, inviteEmail);
      setInviteEmail('');
      loadGroups();
    } catch (error) {
      console.error('Failed to add member:', error);
    }
  };

  const handleRemoveMember = async () => {
    if (!selectedGroup || !removeEmail) return;
    try {
      await removeMember(selectedGroup._id, removeEmail);
      setRemoveEmail('');
      loadGroups();
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1">
        {/* <Navbar /> */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Group Management</h1>

          {/* Create Group */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Create Group</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="border p-2 rounded flex-1"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <input
                className="border p-2 rounded flex-1"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleCreateGroup}
              >
                Create
              </button>
            </div>
          </div>

          {/* Manage Members */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Manage Members</h2>

            <select
              className="border p-2 rounded w-full mb-4"
              value={selectedGroup?._id || ''}
              onChange={(e) => {
                const group = groups.find((g) => g._id === e.target.value);
                setSelectedGroup(group);
                setCurrentGroup(group);
              }}
            >
              <option value="">Select Group</option>
              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                className="border p-2 rounded flex-1"
                placeholder="Invite Member by Email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleAddMember}
              >
                Add Member
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="border p-2 rounded flex-1"
                placeholder="Remove Member by Email"
                value={removeEmail}
                onChange={(e) => setRemoveEmail(e.target.value)}
              />
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleRemoveMember}
              >
                Remove Member
              </button>
            </div>
          </div>

          {/* List Groups */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
            <ul className="space-y-2">
              {groups.map((group) => (
                <li
                  key={group._id}
                  className="p-3 border rounded hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    setSelectedGroup(group);
                    setCurrentGroup(group);
                  }}
                >
                  <strong>{group.name}</strong> - {group.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;
