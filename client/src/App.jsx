import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';  // ✅ Import Tasks Page
import Groups from './pages/Groups'; 
import Kanban from './pages/Kanban'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />  {/* ✅ Add this line */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/groups" element={<Groups />} /> 
        <Route path="/kanban" element={<Kanban />} />
      </Routes>
    </Router>
  );
}

export default App;
