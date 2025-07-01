// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import KanbanBoard from '../components/KanbanBoard';

// function Kanban() {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="flex-1 p-6">
//           <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>
//           <KanbanBoard />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Kanban;


// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
import KanbanBoard from '../components/KanbanBoard';

function Kanban() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold">Kanban Board</h1>
          </div>

          <KanbanBoard />
        </main>
      </div>
    </div>
  );
}

export default Kanban;
