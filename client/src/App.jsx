import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GroupProvider } from "./context/GroupContext";
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from "./pages/Tasks";
import Groups from "./pages/Groups";
import Kanban from "./pages/Kanban";
import Dashboard from "./pages/Dashboard";
import Reminders from "./pages/Reminders"; // ✅ Import Reminders Page

function App() {
  return (
    <GroupProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* ✅ Add this */}
        </Routes>
      </BrowserRouter>
    </GroupProvider>
  );
}

export default App;
