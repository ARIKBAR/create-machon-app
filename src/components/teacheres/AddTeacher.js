import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../students/AddStudent.css';


function AddTeacher() {
  const [nameMishpacha, setNameMishpacha] = useState('');
  const [namePrati, setNamePrati] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://servermachon.onrender.com/api/teachers', { nameMishpacha, namePrati });
    //   navigate('/teachers');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>יצירת מורה חדש </h2>
      <div className="form-group">
        <input type="text" value={namePrati} onChange={(e) => setNamePrati(e.target.value)} required />
        <label>שם פרטי:</label>
      </div>
      <div className="form-group">
        <input type="text" value={nameMishpacha} onChange={(e) => setNameMishpacha(e.target.value)} required />
        <label>שם משפחה:</label>
      </div>
      {/* <div className="form-group">
        <label>מרצה:</label>
        <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} required />
      </div> */}
      <button className="submit-btn" type="submit">צור מורה</button>
    </form>
  );
}

export default AddTeacher;