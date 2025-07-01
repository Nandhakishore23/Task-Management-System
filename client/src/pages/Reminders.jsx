// // import { useEffect, useState } from 'react';
// // import { getReminders, createReminder, deleteReminder } from '../services/reminderService';
// // import ReminderForm from '../components/ReminderForm';
// // import ReminderCard from '../components/ReminderCard';
// // import Navbar from '../components/Navbar';
// // import Sidebar from '../components/Sidebar';
// // import { useGroup } from '../context/GroupContext';

// // function Reminders() {
// //   const { currentGroup } = useGroup();
// //   const [reminders, setReminders] = useState([]);
// //   const [showForm, setShowForm] = useState(false);

// //   const loadReminders = async () => {
// //     if (!currentGroup) return;
// //     const res = await getReminders(currentGroup._id);
// //     setReminders(res.data);
// //   };

// //   useEffect(() => {
// //     loadReminders();
// //   }, [currentGroup]);

// //   const handleCreate = async (data) => {
// //     await createReminder({ ...data, group: currentGroup._id });
// //     loadReminders();
// //   };

// //   const handleDelete = async (id) => {
// //     await deleteReminder(id);
// //     loadReminders();
// //   };

// //   if (!currentGroup) {
// //     return (
// //       <div className="flex items-center justify-center w-full h-screen">
// //         <h2 className="text-2xl font-semibold">
// //           🚀 Please select a group first to view reminders.
// //         </h2>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col">
// //         <Navbar />
// //         <main className="flex-1 p-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <h1 className="text-3xl font-bold">Reminders</h1>
// //             <button
// //               onClick={() => setShowForm(true)}
// //               className="px-4 py-2 bg-blue-600 text-white rounded"
// //             >
// //               + Add Reminder
// //             </button>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {reminders.length === 0 ? (
// //               <p className="text-gray-600">No reminders found for this group.</p>
// //             ) : (
// //               reminders.map((reminder) => (
// //                 <ReminderCard
// //                   key={reminder._id}
// //                   reminder={reminder}
// //                   onDelete={handleDelete}
// //                 />
// //               ))
// //             )}
// //           </div>
// //         </main>
// //       </div>

// //       {showForm && (
// //         <ReminderForm
// //           onClose={() => setShowForm(false)}
// //           onSubmit={handleCreate}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default Reminders;


// import { useEffect, useState } from 'react';
// import { getReminders, createReminder, deleteReminder } from '../services/reminderService';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import { useGroup } from '../context/GroupContext';

// function Reminders() {
//   const { currentGroup } = useGroup();
//   const [reminders, setReminders] = useState([]);
//   const [title, setTitle] = useState('');
//   const [dueDate, setDueDate] = useState('');

//   const loadReminders = async () => {
//     if (!currentGroup) return;
//     try {
//       const res = await getReminders(currentGroup._id);
//       setReminders(res.data);
//     } catch (error) {
//       console.error('Error fetching reminders:', error);
//     }
//   };

//   useEffect(() => {
//     loadReminders();
//   }, [currentGroup]);

//   const handleCreate = async () => {
//     if (!title || !dueDate) return;
//     try {
//       await createReminder({
//         title,
//         dueDate,
//         group: currentGroup._id,
//       });
//       setTitle('');
//       setDueDate('');
//       loadReminders();
//     } catch (error) {
//       console.error('Error creating reminder:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteReminder(id);
//       loadReminders();
//     } catch (error) {
//       console.error('Error deleting reminder:', error);
//     }
//   };

//   if (!currentGroup) {
//     return (
//       <div className="flex items-center justify-center w-full h-screen">
//         <h2 className="text-2xl font-semibold">
//           🚀 Please select a group first to view reminders.
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="flex-1 p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold">Reminders</h1>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Reminder Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="border px-3 py-2 rounded"
//               />
//               <input
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 className="border px-3 py-2 rounded"
//               />
//               <button
//                 onClick={handleCreate}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 + Add Reminder
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded shadow p-6">
//             {reminders.length === 0 ? (
//               <p className="text-gray-600">No reminders set for this group.</p>
//             ) : (
//               <ul className="space-y-4">
//                 {reminders.map((reminder) => (
//                   <li
//                     key={reminder._id}
//                     className="flex justify-between items-center border p-3 rounded hover:bg-blue-50"
//                   >
//                     <div>
//                       <h2 className="text-lg font-semibold">{reminder.title}</h2>
//                       <p className="text-sm text-gray-600">
//                         Due on: {new Date(reminder.dueDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => handleDelete(reminder._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Reminders;


import { useEffect, useState } from 'react';
import { getReminders, createReminder, deleteReminder } from '../services/reminderService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useGroup } from '../context/GroupContext';
import ReminderCard from '../components/ReminderCard';
import ReminderForm from '../components/ReminderForm';

function Reminders() {
  const { currentGroup } = useGroup();
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editReminder, setEditReminder] = useState(null);

  const loadReminders = async () => {
    if (!currentGroup) return;
    try {
      const res = await getReminders(currentGroup._id);
      setReminders(res.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  useEffect(() => {
    loadReminders();
  }, [currentGroup]);

  const handleCreate = async (data) => {
    try {
      await createReminder({ ...data, group: currentGroup._id });
      loadReminders();
    } catch (error) {
      console.error('Error creating reminder:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReminder(id);
      loadReminders();
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  return !currentGroup ? (
    <div className="flex items-center justify-center w-full h-screen">
      <h2 className="text-2xl font-semibold">
        🚀 Please select a group first to view reminders.
      </h2>
    </div>
  ) : (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Reminders</h1>
            <button
              onClick={() => {
                setEditReminder(null);
                setShowForm(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Reminder
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reminders.length === 0 ? (
              <p className="text-gray-600">No reminders set for this group.</p>
            ) : (
              reminders.map((reminder) => (
                <ReminderCard
                  key={reminder._id}
                  reminder={reminder}
                  onEdit={(r) => {
                    setEditReminder(r);
                    setShowForm(true);
                  }}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {showForm && (
        <ReminderForm
          onClose={() => {
            setShowForm(false);
            setEditReminder(null);
          }}
          onSubmit={(form) => {
            if (editReminder) {
              handleDelete(editReminder._id); // Simple replace instead of update API
            }
            handleCreate(form);
          }}
          initialData={editReminder}
        />
      )}
    </div>
  );
}

export default Reminders;
