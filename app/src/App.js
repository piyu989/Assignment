import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentList from './components/StudentList';
// import AddStudentPage from './components/AddStudent';

function App() {
  // return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/students" component={StudentList} /> */}
        <Route path="/students" element={<StudentList />} />

      </Routes>
    </Router>
  // );
}

export default App;