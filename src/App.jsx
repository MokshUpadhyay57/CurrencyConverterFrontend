import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import Converter from './pages/currencyConverter';  // Make sure to create these components
import TimeSeries from './pages/timeseries';
import History from './pages/history';
import Test from './pages/test';

function App(){
  return (
    <>
      
      <BrowserRouter>
        <Routes>
            <Route path="/convert" element={<Converter/>} />
            <Route path="/time-series" element={<TimeSeries/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/" exact element={<Test/>} />
        </Routes>

      
      </BrowserRouter>
    </>
    );
};



export default App
