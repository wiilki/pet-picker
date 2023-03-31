import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Provider } from 'react-redux';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';

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
