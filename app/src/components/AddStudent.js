import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStudentPage = () => {
  const [formData, setFormData] = useState({ contactDetails: '', name: '', address: '', pincode: 0 });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9090/student/save', formData, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      navigate('/student/all');
    } catch (error) {
      console.error('Failed to add student:', error);
      setError('Failed to add student');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Add Student</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="contactDetails"
          value={formData.contactDetails}
          onChange={handleInputChange}
          placeholder="Contact Details"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="number"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          placeholder="Pincode"
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentPage;
