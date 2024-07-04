
import React, { useState } from 'react'
import AddStudent from './components/students/AddStudent';
import StudentList from './components/students/stundentList';
import StudentDetails from './components/students/studentsDetails'
import StudentEdit from './components/students/studentEdit';
import ClassList from './components/classes/classList'
import AddClass from './components/classes/AddClass'
import Layout from './components/students/Layout';
import ExcelUploader from './components/students/ExcelUploader';
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
            <Route path="/classes" element={<ClassList />} />
            <Route path="/classes/new" element={<AddClass />} />
         </Route>

      </Routes>

   )
}

export default App;
