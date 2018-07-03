import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PersistentDrawer from './homePage/nav'
class App extends Component {
  render() {
    return (
      <PersistentDrawer/>
    );
  }
}

export default App;
