import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Reserve from './pages/Reserve/Reserve';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/reserve" element={<Reserve/>}/>
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
