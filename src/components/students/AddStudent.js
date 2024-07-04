import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './AddStudent.css';

const AddStudent = () => {
  const [student, setStudent] = useState({
    created: '',
    class:'',
    shlucha: '',
    maslul: '',
    namePrati: '',
    nameMishpacha: '',
    id: '',
    tl: '',
    tlhw: '',
    addres: '',
    city: '',
    phone: '',
    nameAv: '',
    telphon: '',
    email: '',
    statusp:'',
    paymentesder:'',
    paymentMethod: '',
    creditCardNumber: '',
    creditCardExpiry: '',
    creditCardCVV: '',
    notes: '',

  });

  const [classes, setClasses] = useState([]);

useEffect(() => {
  const fetchClasses = async () => {
    try {
      const response = await axios.get('https://servermachon.onrender.com/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };
  fetchClasses();
}, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = { ...student };
      if (studentData.class === '') {
        delete studentData.class; // מחק את השדה אם לא נבחרה כיתה
      }
      const res = await axios.post('https://servermachon.onrender.com/api/students', studentData);
      console.log('תלמיד נשמר בהצלחה:', res.data);
      // כאן תוכל להוסיף לוגיקה נוספת, כמו ניקוי הטופס או הודעה למשתמש
    } catch (err) {
      console.error('שגיאה בשמירת תלמיד:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>הוספת תלמיד חדש</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <input
            type="date"
            name="created"
            value={student.created}
            onChange={handleChange}
            required
          />
          <label>תאריך רישום</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="shlucha"
            value={student.shlucha}
            onChange={handleChange}
            required
          />
          <label>שלוחה</label>
        </div>
        <div className="form-group">
  <select
    name="class"
    value={student.class}
    onChange={handleChange}
    required
  >
    <option value="">בחר כיתה</option>
    {classes.map((cls) => (
      <option key={cls._id} value={cls._id}>{cls.name}</option>
    ))}
  </select>
  <label>כיתה</label>
</div>
        <div className="form-group">
        <select
            name="maslul"
            value={student.maslul}
            onChange={handleChange}
          >
            <option value=""> </option>
            <option name='maslul' value="גיל הרך ותושב''ע"> גיל הרך ותושב''ע</option>
            <option name='maslul' value="יסודי (כיתות א-ח) - הוראה כוללת ותושב''ע"> יסודי (כיתות א-ח) - הוראה כוללת ותושב''ע</option>
            <option name='maslul' value="חינוך מיוחד - כיתות א - יב ותושב''ע"> חינוך מיוחד - כיתות א - יב ותושב''ע</option>
            <option name='maslul' value="על יסודי "> על יסודי </option>
            <option name='maslul' value="ייעוץ חינוכי"> ייעוץ חינוכי</option>
            <option name='maslul' value="הרחבת הסמכה"> הרחבת הסמכה</option>
          </select>
          <label>מסלול</label>
          </div>
        <div className="form-group">
          <input
            type="text"
            name="namePrati"
            value={student.namePrati}
            onChange={handleChange}
            required
          />
          <label>שם פרטי</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="nameMishpacha"
            value={student.nameMishpacha}
            onChange={handleChange}
            required
          />
          <label>שם משפחה</label>
        </div>
        <div className="form-group">
          <input
            type="number"
            name="id"
            value={student.id}
            onChange={handleChange}
            required
          />
          <label>מספר זהות</label>
        </div>
        <div className="form-group">
          <input
            type="date"
            name="tl"
            value={student.tl}
            onChange={handleChange}
            required
          />
          <label>תאריך לידה</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="tlhw"
            value={student.tlhw}
            onChange={handleChange}
            required
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
            <option  value="נשוי"> נשוי</option>
            <option  value="רווק">רווק</option>
            <option  value="אלמן">אלמן</option>
            <option  value="גרוש">גרוש</option>
        
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
            <option value="תשלום 750 שח">תשלום 750 ש"ח לחודש </option>
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
          <label>מספר חשבון/כרטיס אשראי</label>
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

        <button type="submit" className="submit-btn">שמור תלמיד</button>
      </form>
    </div>
  );
};

export default AddStudent;