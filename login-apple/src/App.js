import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';

class App extends Component {
  auth = firebase.auth()
  async signInWithApple() {
    const provider = new firebase.auth.OAuthProvider('apple.com')
    const result = await this.auth.signInWithPopup(provider)
    console.log(result.user);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
