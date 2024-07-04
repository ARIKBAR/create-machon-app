import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import './ClassList.css';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('https://servermachon.onrender.com/api/classes?populate=students');
        setClasses(response.data);
        setLoading(false);
      } catch (err) {
        setError('אירעה שגיאה בטעינת הנתונים');
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return <div className="loading">טוען נתונים...</div>;
  if (error) return <div className="error">{error}</div>;

  const handleDelete = async (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק כיתה זו?')) {
      try {
        await axios.delete(`http://localhost:5000/api/classes/${id}`);
        setClasses(classes.filter(classItem => classItem._id !== id));
      } catch (error) {
        console.error('שגיאה במחיקת הכיתה:', error);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את כל הכיתות? פעולה זו בלתי הפיכה!')) {
      try {
        await axios.delete('http://localhost:5000/api/classes/deleteAll');
        setClasses([]);
        alert('כל הכיתות נמחקו בהצלחה');
      } catch (error) {
        console.error('שגיאה במחיקת כל הכיתות:', error);
        alert(`אירעה שגיאה במחיקת הכיתות: ${error.message}`);
      }
    }
  };

  const filteredClasses = classes.filter(item => 
    item.name.includes(search) || 
    item.teacher.includes(search) ||
    item.students.some(student => 
      `${student.namePrati} ${student.nameMishpacha}`.includes(search)
    )
  );

  return (
    <div className="class-list">
      <button onClick={handleDeleteAll} className="delete-all-btn">
        <FaTrash /> מחק את כל הכיתות
      </button>
      <input
        type='text'
        placeholder='חפש'
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <h2>רשימת כיתות</h2>
      <table>
      <thead>
  <tr>
    <th>שם הכיתה</th>
    <th>שכבה</th>
    <th>מחנך/ת</th>
    <th>מספר תלמידים</th>
    <th>תלמידים</th>
    <th>פעולות</th>
  </tr>
</thead>
<tbody>
  {filteredClasses.map((classItem) => (
    <tr key={classItem._id}>
      <td>{classItem.name}</td>
      <td>{classItem.grade}</td>
      <td>{classItem.teacher}</td>
      <td>{classItem.students ? classItem.students.length : 0}</td>
    <td>
      {classItem.students && classItem.students.map(student => 
        `${student.namePrati} ${student.nameMishpacha}`
      ).join(', ')}
    </td>
      <td>
        <button className="action-btn view" onClick={() => navigate(`/class/${classItem._id}`)}>צפייה</button>
        <button className="action-btn edit" onClick={() => navigate(`/edit-class/${classItem._id}`)}>עריכה</button>
        <button className="action-btn delete" onClick={() => handleDelete(classItem._id)}>מחיקה</button>
      </td>
      <td>
  <button onClick={() => setSelectedClass(classItem)}>
    צפייה בתלמידים ({classItem.students.length})
  </button>
</td>
    </tr>
  ))}
</tbody>
      </table>

      {selectedClass && (
  <div className="modal">
    <h3>תלמידים בכיתה {selectedClass.name}</h3>
    <ul>
      {selectedClass.students.map(student => (
        <li key={student._id}>
          {student.namePrati} {student.nameMishpacha}
        </li>
      ))}
    </ul>
    <button onClick={() => setSelectedClass(null)}>סגור</button>
  </div>
)}
    </div>
  );
};

export default ClassList;