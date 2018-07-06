import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MiniDrawer from './nav/nav'
import UserPageNav from "./userCenter/userPageNav";
import MainPage from "./homePage/mainPage";
import TempChart from "./chart/chart"
import {
    HashRouter,
    Route
} from 'react-router-dom';
import Floor from "./presentDish/Floor"
class App extends Component {
  render() {
    return (
        <HashRouter>
          <MiniDrawer>
              <Route exact  path="/" component={MainPage}/>
              <Route path="/usercenter/:key" component={UserPageNav}/>
              <Route path="/floor/:key" component={Floor}/>
              <Route path="/admin" component={Floor}/>
              <Route path="/worker" component={Floor}/>
              <Route path="/test" component={TempChart}/>
          </MiniDrawer>
        </HashRouter>
    );
  }
}

export default App;
