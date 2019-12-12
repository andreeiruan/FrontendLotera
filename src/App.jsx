import React, { useEffect } from 'react';
import './App.css';

import { isAuthenticated } from './services/auth'

import Menu from './components/Menu'
import Footer from './components/Footer'
import Routes from './routes'

export default App => {
  return (
    <div className="app">
      <Routes/>
      <Footer/>
    </div>
  )
};
