import React, {useState} from 'react';
import Home from './pages/Home'
import Navbar from './Navigation/ Navbar'
import Cat from './pages/Cat'
import "./index.css";
import { Login } from './components/Login';
import { Signup } from './components/Signup';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (forName) => {
    setCurrentForm(forName);
  }
  return (
    <div className="App">
      
      
      
      
      
      {
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
       
      }
    </div>
    
  );
   

}

export default App;
