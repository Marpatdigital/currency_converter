import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConverterPage from './pages/ConverterPage';
import RatesPage from './pages/RatesPage';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Конвертер</Link>
          </li>
          <li>
            <Link to="/rates">Текущие курсы валют</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ConverterPage />} />
        <Route path="/rates" element={<RatesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
