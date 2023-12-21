import React from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';
import SignUp from './SignUp'; // Your SignUp component
import Login from './Login'; // Your Login component
import ResetPassword from './ResetPassword';
import TicTacToe from './GameBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/ResetPassword' element={<ResetPassword />} />
        <Route path="/GameBoard" element={<TicTacToe />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;