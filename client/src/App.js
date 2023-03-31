import React, {useState} from 'react';
import Home from './pages/Home'
import Navbar from './Navigation/ Navbar'
import Cat from './pages/Cat'
import "./index.css";
import { Login } from './components/Login';
import { Signup } from './components/Signup';

function App() {
  return (
    <div className="App">
      <Login />
    </div>
    
  );
   

}

export default App;
