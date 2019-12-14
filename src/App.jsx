import React from 'react';
import './App.css';
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
