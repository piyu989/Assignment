import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [formData, setFormData] = useState({ contactDetails: '', name: '', address: '', pincode: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = async () => {
    try {
      console.log('Adding student:', formData);
      await axios.post('http://localhost:9090/student/save', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/students'); // Redirect back to the student list
    } catch (error) {
      console.error('Error adding student:', error);
      setError('Failed to add student');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Add Student</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="contactDetails"
        value={formData.contactDetails}
        onChange={handleInputChange}
        placeholder="Contact Details"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        name="pincode"
        value={formData.pincode}
        onChange={handleInputChange}
        placeholder="Pincode"
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleAddStudent}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default AddStudent;
