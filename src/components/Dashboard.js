import React, { useState, useEffect } from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';


import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    totalTeachers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const studentsResponse = await axios.get(`https://servermachon.onrender.com/api/students`);
      const classesResponse = await axios.get(`https://servermachon.onrender.com/api/classes`);
      const teachersResponse = await axios.get(`https://servermachon.onrender.com/api/teachers`);

      setStats({
        totalStudents: studentsResponse.data.length,
        totalClasses: classesResponse.data.length,
        totalTeachers: teachersResponse.data.length,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('אירעה שגיאה בטעינת הנתונים');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <h1 className='h1'>מכון למורים</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>סך הכל תלמידים</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>סך הכל כיתות</h3>
          <p>{stats.totalClasses}</p>
        </div>
        <div className="stat-card">
          <h3>סך הכל מורים</h3>
          <p>{stats.totalTeachers}</p>
        </div>
      </div>

      <div className="quick-links">
        <h2>קישורים מהירים</h2>
        <button onClick={() => navigate('/Addstudent')}>הוספת תלמיד חדש</button>
        <button onClick={() => navigate('/classes/new')}>יצירת כיתה חדשה</button>
        <button onClick={() => navigate('/attendance')}>דיווח נוכחות</button>
        <button onClick={() => navigate('/reports')}>הפקת דוחות</button>
      </div>
    </div>
  );
}

export default Dashboard;