import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { contactDetails } = useParams(); // Extract contactDetails from URL
  const [formData, setFormData] = useState({ contactDetails: '', name: '', address: '', pincode: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/student/${contactDetails}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch student data');
      }
    };

    fetchStudent();
  }, [contactDetails, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateStudent = async () => {
    try {
      await axios.put('http://localhost:9090/student/update', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/students');
    } catch (error) {
      console.error('Error updating student:', error);
      setError('Failed to update student');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Edit Student</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="contactDetails"
        value={formData.contactDetails}
        onChange={handleInputChange}
        placeholder="Contact Details"
        className="border p-2 mb-2 w-full"
        readOnly // Contact details should not be editable
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
        onClick={handleUpdateStudent}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Update Student
      </button>
    </div>
  );
};

export default EditStudent;
