import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search,setSearch]=useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://servermachon.onrender.com/api/students');
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError('אירעה שגיאה בטעינת הנתונים');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="loading">טוען נתונים...</div>;
  if (error) return <div className="error">{error}</div>;

  const handleDelete = async (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק תלמיד זה?')) {
      try {
        await axios.delete(`https://servermachon.onrender.com/api/students/${id}`);
        // עדכון הרשימה לאחר המחיקה
        setStudents(students.filter(student => student._id !== id));
      } catch (error) {
        console.error('שגיאה במחיקת התלמיד:', error);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את כל התלמידים? פעולה זו בלתי הפיכה!')) {
      try {
        const response = await fetch('http://localhost:5000/api/students/deleteAll', {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Server response:', data);
        setStudents([]);
        alert('כל התלמידים נמחקו בהצלחה');
      } catch (error) {
        console.error('שגיאה במחיקת כל התלמידים:', error);
        alert(`אירעה שגיאה במחיקת התלמידים: ${error.message}`);
      }
    }
  };

  const filterStudent=students.filter(item=>item.namePrati.includes(search)||item.nameMishpacha.includes(search))
  return (
    
    <div className="student-list">
      <button onClick={handleDeleteAll} className="delete-all-btn">
        <FaTrash /> מחק את כל התלמידים
      </button>
        <input
        type='text'
        placeholder='חפש'
        onChange={e=>setSearch(e.target.value)}
        value={search}/>
      <h2>רשימת תלמידים</h2>
      <table>
        <thead>
          <tr>
            <th>שם פרטי</th>
            <th>שם משפחה</th>
            <th>מספר זהות</th>
            <th>טלפון</th>
            <th>עיר</th>
            <th>כיתה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {filterStudent.map((student) => (
            <tr key={student.id}>
              <td>{student.namePrati}</td>
              <td>{student.nameMishpacha}</td>
              <td>{student.id}</td>
              <td>{student.phone}</td>
              <td>{student.city}</td>
              <td>{student.classes}</td>
              <td>
              <button className="action-btn view"  onClick={() => navigate(`/student/${student._id}`)}>צפייה</button>
              <button className="action-btn edit" onClick={() => navigate(`/edit-student/${student._id}`)}>עריכה</button>               
               <button className="action-btn delete" onClick={() => handleDelete(student._id)}>מחיקה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;