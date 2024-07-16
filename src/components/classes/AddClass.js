import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../students/AddStudent.css';


function AddClass() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [teacher, setTeacher] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://servermachon.onrender.com/api/classes', { name, grade, teacher });
      navigate('/classes');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>יצירת כיתה חדשה</h2>
      <div className="form-group">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>שנת לימודים:</label>
      </div>
      <div className="form-group">
        <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required />
        <label>עיר:</label>
      </div>
      <div className="form-group">
        <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} required />
        <label>מרצה:</label>
      </div>
      <button className="submit-btn" type="submit">צור כיתה</button>
    </form>
  );
}

export default AddClass;