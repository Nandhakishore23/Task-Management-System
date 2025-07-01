// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { getGroups } from "../services/groupService";
// import { useGroup } from "../context/GroupContext";

// function Sidebar() {
//   const { currentGroup, setCurrentGroup } = useGroup();
//   const [groups, setGroups] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     const loadGroups = async () => {
//       const res = await getGroups();
//       setGroups(res.data);
//       if (!currentGroup && res.data.length > 0) {
//         setCurrentGroup(res.data[0]); // ✅ Auto-select first group
//       }
//     };
//     loadGroups();
//   }, []);

//   const linkClass = (path) =>
//     location.pathname === path ? "bg-blue-600 text-white" : "hover:bg-blue-100";

//   return (
//     <div className="w-64 bg-white shadow flex flex-col">
//       <div className="p-4 border-b">
//         <h2 className="text-xl font-bold">Task Manager</h2>
//         <select
//           className="mt-3 w-full border rounded p-2"
//           value={currentGroup?._id || ""}
//           onChange={(e) => {
//             const group = groups.find((g) => g._id === e.target.value);
//             setCurrentGroup(group);
//           }}
//         >
//           {/* {groups.map((g) => (
//             <option key={g._id} value={g._id}>
//               {g.name}
//             </option>
//           ))} */}

//           {groups.length === 0 ? (
//             <option>No Groups Found</option>
//           ) : (
//             groups.map((g) => (
//               <option key={g._id} value={g._id}>
//                 {g.name}
//               </option>
//             ))
//           )}
//         </select>
//       </div>

//       <nav className="flex-1 p-4 space-y-2">
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/"
//               className={`block px-4 py-2 rounded ${linkClass("/")}`}
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/tasks"
//               className={`block px-4 py-2 rounded ${linkClass("/tasks")}`}
//             >
//               Tasks
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/kanban"
//               className={`block px-4 py-2 rounded ${linkClass("/kanban")}`}
//             >
//               Kanban Board
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/groups"
//               className={`block px-4 py-2 rounded hover:bg-blue-100 ${
//                 location.pathname === "/groups" ? "bg-blue-200" : ""
//               }`}
//           >
//             Groups
//           </Link>
//           </li>
//           <li>
//             <Link
//               to="/reminders"
//               className={`block px-4 py-2 rounded ${linkClass("/reminders")}`}
//             >
//               Reminders
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Sidebar;


import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getGroups } from "../services/groupService";
import { useGroup } from "../context/GroupContext";

function Sidebar({ closeSidebar }) {
  const { currentGroup, setCurrentGroup } = useGroup();
  const [groups, setGroups] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadGroups = async () => {
      const res = await getGroups();
      setGroups(res.data);
      if (!currentGroup && res.data.length > 0) {
        setCurrentGroup(res.data[0]);
      }
    };
    loadGroups();
  }, []);

  const linkClass = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "hover:bg-blue-100";

  return (
    <div className="w-64 bg-white shadow h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Task Manager</h2>
        <button className="md:hidden" onClick={closeSidebar}>
          ❌
        </button>
      </div>

      <div className="p-4">
        <select
          className="w-full border rounded p-2"
          value={currentGroup?._id || ""}
          onChange={(e) => {
            const group = groups.find((g) => g._id === e.target.value);
            setCurrentGroup(group);
          }}
        >
          {groups.length === 0 ? (
            <option>No Groups Found</option>
          ) : (
            groups.map((g) => (
              <option key={g._id} value={g._id}>
                {g.name}
              </option>
            ))
          )}
        </select>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <ul className="space-y-2">
          {[
            { name: 'Dashboard', path: '/' },
            { name: 'Tasks', path: '/tasks' },
            { name: 'Kanban Board', path: '/kanban' },
            { name: 'Groups', path: '/groups' },
            { name: 'Reminders', path: '/reminders' },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={closeSidebar}
                className={`block px-4 py-2 rounded ${linkClass(item.path)}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
