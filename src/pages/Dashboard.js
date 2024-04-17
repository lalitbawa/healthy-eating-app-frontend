import React from 'react'
import Navbar from '../features/navbar/Navbar'
import CalorieCounter from '../features/calorie-counter/CalorieCounter'

export default function Dashboard() {
  return (
    <div>
        <Navbar></Navbar>
        <CalorieCounter></CalorieCounter>
    </div>
  )
}
