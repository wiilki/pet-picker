import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import store from './utils/store';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Search from './pages/Search';
import Signup from './pages/Signup';
import Nav from './components/Nav';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Provider store={store}>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
