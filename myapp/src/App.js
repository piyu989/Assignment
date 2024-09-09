import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
import Login from './components/Login';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import SignUp from './SignUp';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:contactDetails" element={<EditStudent />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
