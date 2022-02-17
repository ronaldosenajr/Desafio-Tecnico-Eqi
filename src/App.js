import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TelaInicial from './Pages/TelaInicial';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <TelaInicial /> } />
      </Routes>
    </div>
  );
}

export default App;
