import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './features/auth/components/Login';
import Signup from './features/auth/components/Signup';
import Logout from './features/auth/components/Logout';
import Protected from './features/auth/Protected';

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
