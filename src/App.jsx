import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CurrencyConverter from './components/Converter';
import Home from './components/Home';
import History from './components/History';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/converter" element={<CurrencyConverter/>} />
          <Route path="/" index element={<Home/>} />
          <Route path="/History" element={<History/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
