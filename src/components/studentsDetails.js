import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentDetails.css'

function StudentDetails() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      console.log('Fetching student with ID:', id);
      const response = await axios.get(`https://servermachon.onrender.com/api/students/${id}`);
      console.log('Received response:', response.data);
      setStudent(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching student:', error.response?.data || error.message);
      setError('אירעה שגיאה בטעינת פרטי התלמיד');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!student) return <div className="error">לא נמצא תלמיד</div>;

  return (
    <div className="student-details">
      <h2>פרטי תלמיד</h2>
      <div className="student-card">
        <p><strong>שם משפחה:</strong> {student.nameMishpacha}</p>
        <p><strong>שם פרטי:</strong> {student.namePrati}</p>
        <p><strong>תאריך יצירה:</strong> {student.created}</p>
        <p><strong>שלוחה:</strong> {student.shlucha}</p>
        <p><strong>מסלול:</strong> {student.maslul}</p>
        <p><strong>ת.ז:</strong> {student.id}</p>
        <p><strong>תאריך לידה:</strong> {student.tl}</p>
        <p><strong>תאריך לידה עברי:</strong> {student.tlhw}</p>
        <p><strong>כתובת:</strong> {student.addres}</p>
        <p><strong>עיר:</strong> {student.city}</p>
        <p><strong>פלאפון:</strong> {student.phone}</p>
        <p><strong>טלפון:</strong> {student.telphon}</p>
        <p><strong>שם האב:</strong> {student.nameAv}</p>
        <p><strong>מייל:</strong> {student.email}</p>
        <p><strong>כיתה:</strong> {student.classes}</p>
        <p><strong>מצב משפחתי:</strong> {student.statusp}</p>
        <p><strong>הסדר תשלום:</strong> {student.paymentesder}</p>
        <p><strong>שיטת תשלום:</strong> {student.paymentMethod}</p>
        <p><strong>מספר אשראי:</strong> {student.creditCardNumber}</p>
        <p><strong>הערות:</strong> {student.notes}</p>
      </div>
      <button className="back-btn" onClick={() => navigate('/')}>חזרה לרשימה</button>
    </div>
  );
  
}

export default StudentDetails;