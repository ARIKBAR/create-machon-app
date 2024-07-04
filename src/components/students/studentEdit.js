import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './studentEdit.css'; // נניח שהעיצוב שסיפקת נמצא בקובץ זה

const StudentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    created: '',
    shlucha: '',
    maslul: '',
    namePrati: '',
    nameMishpacha: '',
    id: '',
    tl: '',
    tlhw: '',
    addres: '',
    nameAv: '',
    city: '',
    phone: '',
    email: '',
    telphon: '',
    statusp: '',
    paymentesder: '',
    paymentMethod: '',
    creditCardNumber: '',
    creditCardExpiry: '',
    creditCardCVV: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`https://servermachon.onrender.com/api/students/${id}`);
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        setError('אירעה שגיאה בטעינת הנתונים');
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevStudent => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://servermachon.onrender.com/api/students/${id}`, student);
      navigate('/');
    } catch (err) {
      setError('אירעה שגיאה בעדכון הנתונים');
    }
  };

  if (loading) return <div>טוען נתונים...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="form-container">
      <h2>עריכת תלמיד</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="date"
            name="created"
            value={student.created}
            onChange={handleChange}
            
          />
          <label>תאריך רישום</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="shlucha"
            value={student.shlucha}
            onChange={handleChange}
            
          />
          <label>שלוחה</label>
        </div>
        <div className="form-group">
          <select
            name="maslul"
            value={student.maslul}
            onChange={handleChange}
          >
            <option value=""> </option>
            <option value="גיל הרך ותושב''ע">גיל הרך ותושב''ע</option>
            <option value="יסודי (כיתות א-ח) - הוראה כוללת ותושב''ע">יסודי (כיתות א-ח) - הוראה כוללת ותושב''ע</option>
            <option value="חינוך מיוחד - כיתות א - יב ותושב''ע">חינוך מיוחד - כיתות א - יב ותושב''ע</option>
            <option value="על יסודי">על יסודי</option>
            <option value="ייעוץ חינוכי">ייעוץ חינוכי</option>
            <option value="הרחבת הסמכה">הרחבת הסמכה</option>
          </select>
          <label>מסלול</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="namePrati"
            value={student.namePrati}
            onChange={handleChange}
            
          />
          <label>שם פרטי</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="nameMishpacha"
            value={student.nameMishpacha}
            onChange={handleChange}
            
          />
          <label>שם משפחה</label>
        </div>
        <div className="form-group">
          <input
            type="number"
            name="id"
            value={student.id}
            onChange={handleChange}
            
          />
          <label>מספר זהות</label>
        </div>
        <div className="form-group">
          <input
            type="date"
            name="tl"
            value={student.tl}
            onChange={handleChange}
            
          />
          <label>תאריך לידה</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="tlhw"
            value={student.tlhw}
            onChange={handleChange}
            
          />
          <label>תאריך לידה עברי</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="addres"
            value={student.addres}
            onChange={handleChange}
          />
          <label>כתובת</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="nameAv"
            value={student.nameAv}
            onChange={handleChange}
          />
          <label>שם האב</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="city"
            value={student.city}
            onChange={handleChange}
          />
          <label>עיר</label>
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phone"
            value={student.phone}
            onChange={handleChange}
          />
          <label>פלאפון</label>
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
          <label>מייל</label>
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="telphon"
            value={student.telphon}
            onChange={handleChange}
          />
          <label>טלפון בבית</label>
        </div>
        <div className="form-group">
          <select
            name="statusp"
            value={student.statusp}
            onChange={handleChange}
          >
            <option value="">מצב משפחתי</option>
            <option value="נשוי">נשוי</option>
            <option value="רווק">רווק</option>
            <option value="אלמן">אלמן</option>
            <option value="גרוש">גרוש</option>
          </select>
          <label>מצב משפחתי</label>
        </div>
        <div className="form-group">
          <select
            name="paymentesder"
            value={student.paymentesder}
            onChange={handleChange}
          >
            <option value="">בחר הסדר תשלום</option>
            <option value="תשלום 750 שח">תשלום 750 ש"ח לחודש</option>
            <option value="תשלום 350 שח">תשלום 380 ש"ח לחודש - סבסוד מקרן פילנתרופית</option>
          </select>
          <label>הסדר תשלום</label>
        </div>
        <div className="form-group">
          <select
            name="paymentMethod"
            value={student.paymentMethod}
            onChange={handleChange}
          >
            <option value="">בחר אמצעי תשלום</option>
            <option value="credit">כרטיס אשראי</option>
            <option value="cash">מזומן</option>
            <option value="check">צ'ק</option>
          </select>
          <label>אמצעי תשלום</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="creditCardNumber"
            value={student.creditCardNumber}
            onChange={handleChange}
          />
          <label>מספר כרטיס אשראי</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="creditCardExpiry"
            value={student.creditCardExpiry}
            onChange={handleChange}
          />
          <label>תוקף כרטיס</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="creditCardCVV"
            value={student.creditCardCVV}
            onChange={handleChange}
          />
          <label>CVV</label>
        </div>
        <div className="form-group">
          <textarea
            name="notes"
            value={student.notes}
            onChange={handleChange}
          ></textarea>
          <label>הערות</label>
        </div>
        <button type="submit" className="submit-btn">עדכן תלמיד</button>
      </form>
    </div>
  );
};

export default StudentEdit;