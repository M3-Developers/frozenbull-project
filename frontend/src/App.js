import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Adicione mais rotas aqui */}
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
