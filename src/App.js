
import React, { useState } from 'react'
import AddStudent from './components/AddStudent';
import StudentList from './components/stundentList';
import StudentDetails from './components/studentsDetails'
import StudentEdit from './components/studentEdit';
import Layout from './components/Layout';
import ExcelUploader from './components/ExcelUploader';
import { Routes, Route } from "react-router-dom";



function App() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route path="/" element={<StudentList />} />
            <Route path="/Addstudent" element={<AddStudent />} />
            <Route path="/student/:id" element={<StudentDetails />} />
            <Route path="/edit-student/:id" element={<StudentEdit />} />
            <Route path="upload" element={<ExcelUploader />} />
            <Route path='/all'/>
         </Route>

      </Routes>

   )
}

export default App;
