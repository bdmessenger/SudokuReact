import React from 'react';
import logo from './react_logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Sudoku from './Components/Sudoku';

function App() {
  return (
    <div className="App container">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-7 col-md-10 col-12 text-light text-center mb-2 ">
          <h2 className="mb-0">Sudoku <img src={logo} alt="ReactJS Logo" width="6%"/>React</h2>
          <span className="font-weight-light" style={{fontSize: '15px'}}>By: Brant Messenger</span>
        </div>
        <div className="w-100"></div>
        <Sudoku />
      </div>
    </div>
  );
}

export default App;
