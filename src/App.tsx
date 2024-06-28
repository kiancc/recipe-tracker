import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Groceries from './pages/Groceries';
import Home from './pages/Home';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/recipes" element={<Recipes />}/>
          <Route path="/recipes" element={<Groceries />}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
