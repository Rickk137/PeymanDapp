import React from 'react';
import ReactDOM from 'react-dom';

import './tailwind.output.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Provider as Web3Provider,
  Updater as Web3Updater,
} from './context/Web3';

ReactDOM.render(
  <React.Fragment>
    <Web3Provider>
      <App />
      <Web3Updater />
      <ToastContainer position="top-right" autoClose={8000} pauseOnFocusLoss />
    </Web3Provider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
