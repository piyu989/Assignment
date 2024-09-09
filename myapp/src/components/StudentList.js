// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({ contactDetails: '', name: '', address: '', pincode: '' });
//   const [selectedStudent, setSelectedStudent] = useState(null);



//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         console.log('Fetching students...');
//         const response = await axios.get('http://localhost:9090/student/all', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         console.log('Students fetched:', response.data);
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//         setError('Failed to fetch student data');
//       }
//     };

//     fetchStudents();
//   }, [token]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddStudent = async () => {
//     try {
//       console.log('Adding student:', formData);
//       const response = await axios.post('http://localhost:9090/student/save', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       console.log('Student added:', response.data);
//       setStudents([...students, response.data]);
//       setFormData({ contactDetails: '', name: '', address: '', pincode: 0 });
//     } catch (error) {
//       console.error('Error adding student:', error);
//       setError('Failed to add student');
//     }
//   };

//   const handleUpdateStudent = async () => {
//         try {
//           console.log('Updating student:', formData);
//           const response = await axios.put('http://localhost:9090/student/update', formData, {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           });
//           console.log('Student updated:', response.data);
//           setStudents(students.map(student => student.contactDetails === response.data.contactDetails ? response.data : student));
//           setFormData({ contactDetails: '', name: '', address: '', pincode: 0 });
//           setSelectedStudent(null);
//         } catch (error) {
//           console.error('Error updating student:', error);
//           setError('Failed to update student');
//         }
//       };
    
//       const handleDeleteStudent = async (contactDetails) => {
//         try {
//           console.log('Deleting student with contactDetails:', contactDetails);
//           const response = await axios.delete(`http://localhost:9090/student/delete/${contactDetails}`, {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           });
//           console.log('Student deleted:', response.data);
//           setStudents(students.filter(student => student.contactDetails !== response.data.contactDetails));
//         } catch (error) {
//           console.error('Error deleting student:', error);
//           setError('Failed to delete student');
//         }
//       };
    
//       const handleEditClick = (student) => {
//         setSelectedStudent(student);
//         setFormData(student);
//       };

//       return (
//              <div className="p-8">
//                <h2 className="text-3xl font-bold mb-4">Student List</h2>
//                {error && <p className="text-red-500">{error}</p>}
          
//                <Link to="/add-student">
//                   <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Add Student</button>
//                 </Link>
              
//               <table className="table-auto w-full border-collapse border">
//                 <thead>
//                   <tr>
//                     <th className="border px-4 py-2">Contact Details</th>
//                     <th className="border px-4 py-2">Name</th>
//                     <th className="border px-4 py-2">Address</th>
//                     <th className="border px-4 py-2">Pincode</th>
//                     <th className="border px-4 py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.length > 0 ? (
//                     students.map((student, index) => (
//                       <tr key={index}>
//                         <td className="border px-4 py-2">{student.contactDetails}</td>
//                         <td className="border px-4 py-2">{student.name}</td>
//                         <td className="border px-4 py-2">{student.address}</td>
//                         <td className="border px-4 py-2">{student.pincode}</td>
//                         <td className="border px-4 py-2">
//                           <button
//                             onClick={() => handleEditClick(student)}
//                             className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteStudent(student.contactDetails)}
//                             className="bg-red-500 text-white py-1 px-2 rounded"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="border px-4 py-2 text-center">No students found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           );
// };

// export default StudentList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log('Fetching students...');
        const response = await axios.get('http://localhost:9090/student/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Students fetched:', response.data);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch student data');
      }
    };

    fetchStudents();
  }, [token]);

  const handleDeleteStudent = async (contactDetails) => {
    try {
      console.log('Deleting student with contactDetails:', contactDetails);
      const response = await axios.delete(`http://localhost:9090/student/delete/${contactDetails}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Student deleted:', response.data);
      setStudents(students.filter(student => student.contactDetails !== response.data.contactDetails));
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Failed to delete student');
    }
  };

  const handleEditClick = (student) => {
    navigate(`/edit-student/${student.contactDetails}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Student List</h2>
      {error && <p className="text-red-500">{error}</p>}

      <Link to="/add-student">
        <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Add Student</button>
      </Link>

      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Contact Details</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Pincode</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{student.contactDetails}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.address}</td>
                <td className="border px-4 py-2">{student.pincode}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(student)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.contactDetails)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-center">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
