import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'classlist-polyfill';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}

ReactDOM.render(
  <App />,
  document.getElementById('FormContainer_react')
);
