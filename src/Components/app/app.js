import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Uczestnicy from '../uczestnicy/Uczestnicy'; // Załóżmy, że komponent jest eksportowany domyślnie
import Pytania from '../pytania/Pytania'; // Załóżmy, że komponent jest eksportowany domyślnie
import Glowna from '../glowna/Glowna';
import Etapy from '../etapy/Etapy';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faQuestionCircle,faHome,faSpinner } from '@fortawesome/free-solid-svg-icons'; // Zaimportowanie ikony "upload"

function App() {
  return (
    <Router>
      <div className="app-container">
        <img className='logo' src='images/logo.png' />
        <nav className='options'>
          <a href ='/' className='option'>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </a>
          <a href ='/uczestnicy' className='option'>
            <FontAwesomeIcon icon={faUser} size="2x" />
          </a>
          <a href ='/pytania' className='option'>
            <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
          </a>
          <a href ='/etapy' className='option'>
            <FontAwesomeIcon icon={faSpinner} size="2x" />
          </a>
        </nav>
        <header>
        </header>
        <Routes>
          <Route path ="/" element={<Glowna />}/>
          <Route path ="/etapy" element={<Etapy />}/>
          <Route path="/uczestnicy" element={<Uczestnicy />} />
          <Route path="/pytania" element={<Pytania />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
