import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.output.css';
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
    </Web3Provider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
