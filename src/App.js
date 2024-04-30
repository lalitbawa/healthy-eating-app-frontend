import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './features/auth/components/Login';
import Signup from './features/auth/components/Signup';
import Logout from './features/auth/components/Logout';
import Protected from './features/auth/Protected';
import MyProgress from './pages/MyProgress';
import MeditationPage from './pages/MeditationPage';
import RecepieGeneratorPage from './pages/RecepieGeneratorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Dashboard></Dashboard></Protected>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/myprogress",
    element: <Protected><MyProgress></MyProgress></Protected>,
  },
  {
    path: "/meditation",
    element: <Protected><MeditationPage></MeditationPage></Protected>,
  },
  {
    path: "/recepie-generator",
    element: <Protected><RecepieGeneratorPage></RecepieGeneratorPage></Protected>,
  }
]);



function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
