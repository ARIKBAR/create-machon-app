import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ExcelUploader = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    setMessage('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // שליחת הנתונים לשרת
        const response = await axios.post('https://servermachon.onrender.com/api/students/bulk', data);
        setMessage(`נוספו ${response.data.count} תלמידים בהצלחה!`);
      } catch (error) {
        console.error('Error uploading data:', error);
        setMessage('אירעה שגיאה בהעלאת הנתונים.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h2>העלאת קובץ Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {loading && <p>מעלה נתונים...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExcelUploader;