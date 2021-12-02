import React from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100' style={{ maxWidth: '400px' }}>
            <Routes>
              <Route path='/signup' element={<Signup/>} />
            </Routes>
        </div>

      </Container>
    </BrowserRouter>
  );
}

export default App;
