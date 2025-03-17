import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from './Login';
import Forgot from './Forgot';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='/forgot' element={<Forgot/>} />
    </Routes>
  );
}

export default App;


