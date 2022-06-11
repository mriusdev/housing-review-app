import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flex } from '@chakra-ui/react'

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
