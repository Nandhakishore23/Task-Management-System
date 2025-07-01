// function Navbar() {
//   return (
//     <nav className="flex justify-between items-center bg-white shadow px-6 py-3">
//       <div className="text-2xl font-bold text-blue-600">
//         TaskManager
//       </div>
//       <div className="flex items-center gap-4">
//         <span className="font-medium text-gray-700">Welcome, User</span>
//         <button
//           onClick={() => {
//             localStorage.removeItem('token');
//             window.location.href = '/login';
//           }}
//           className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


function Navbar({ onMenuClick }) {
  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-3">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl"
          onClick={onMenuClick}
        >
          ☰
        </button>
        <div className="text-2xl font-bold text-blue-600">TaskManager</div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-700">Welcome, User</span>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
