import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ClassDetails.css';
import'./studentClass.css'

function ClassDetails() {
  const [classData, setClassData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClassDetails();
    fetchStudents();
  }, [id]);

  const fetchClassDetails = async () => {
    try {
      console.log('Fetching class with ID:', id);
      const response = await axios.get(`https://servermachon.onrender.com/api/classes/${id}`);
      console.log('Received class response:', response.data);
      setClassData(response.data);
    } catch (error) {
      console.error('Error fetching class details:', error.response?.data || error.message);
      setError('אירעה שגיאה בטעינת פרטי הכיתה');
    }
  };

  const fetchStudents = async () => {
    try {
      console.log('Fetching students');
      const response = await axios.get(`https://servermachon.onrender.com/api/students/byClass/${id}`);
      console.log('Received students response:', response.data);
    //   const classStudents = response.data.filter(student => student.class._id === id);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error.response?.data || error.message);
      setError('אירעה שגיאה בטעינת רשימת התלמידים');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!classData) return <div className="error">לא נמצאה כיתה</div>;

  return (
    <div className="class-detailsa">
      <h2>פרטי כיתה</h2>
      <div className="class-card">
        <p><strong>שנת לימודים:</strong> {classData.name}</p>
        <p><strong>עיר:</strong> {classData.grade}</p>
        <p><strong>מחנך/ת:</strong> {classData.teacher}</p>
        <h3>רשימת תלמידים:</h3>
        <div className="students-grida">
          {students.map(student => (
            <div 
              key={student._id} 
              className="student-carda"
              onDoubleClick={() => navigate(`/student/${student._id}`)}
            >
              <div className="student-avatara">
                {student.namePrati[0]}{student.nameMishpacha[0]}
              </div>
              <div className="student-infoa">
                <p className="student-namea">{student.namePrati} {student.nameMishpacha}</p>
                <button 
                  className="back-btna viewa" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/student/${student._id}`);
                  }}
                >
                  צפייה
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="back-btna" onClick={() => navigate('/classes')}>חזרה לרשימת הכיתות</button>
    </div>
  );
}


export default ClassDetails;