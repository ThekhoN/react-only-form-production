import React, { Component } from 'react';
import CreditCardFormContainer from './Container/CreditCardFormContainer'
import './App.css';
import './loader.css';

class App extends Component {
  render() {
    return (
      <div className="MainAppContainer">
        <CreditCardFormContainer/>
      </div>
    );
  }
}

export default App;
