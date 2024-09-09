import React, { useState } from 'react';
import { registerStudent, updateStudent } from '../api/api';

const StudentForm = ({ isEditMode, student, onSave }) => {
  const [name, setName] = useState(student?.name || '');
  const [contactDetails, setContactDetails] = useState(student?.contactDetails || '');
  const [address, setAddress] = useState(student?.address || '');
  const [pincode, setPincode] = useState(student?.pincode || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = { name, contactDetails, address, pincode };
    
    try {
      if (isEditMode) {
        await updateStudent(student.id, studentData);
      } else {
        await registerStudent(studentData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Contact Details"
        value={contactDetails}
        onChange={(e) => setContactDetails(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        required
      />
      <button type="submit">{isEditMode ? 'Update' : 'Register'} Student</button>
    </form>
  );
};

export default StudentForm;
