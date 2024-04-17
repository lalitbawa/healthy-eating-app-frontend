import React from 'react';
import './App.css';
import Navbar from './features/navbar/Navbar';
import CalorieCounter from './features/calorie-counter/CalorieCounter';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <CalorieCounter></CalorieCounter>
      
    </div>
  );
}

export default App;
