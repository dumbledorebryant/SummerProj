import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MiniDrawer from './nav/nav'
import UserPageNav from "./userCenter/userPageNav";
import MainPage from "./homePage/mainPage";
import AllChart from "./chart/allChart"
import {
    HashRouter,
    Route
} from 'react-router-dom';
import Floor from "./presentDish/Floor"
import WorkerPage from "./canteenWorkCenter/uploadPic";
import AdminManager from "./adminPage/AdminManager";
class App extends Component {
  render() {
    return (
        <HashRouter>
          <MiniDrawer>
              <Route exact  path="/" component={MainPage}/>
              <Route path="/usercenter/:key" component={UserPageNav}/>
              <Route path="/floor/:key" component={Floor}/>
              <Route path="/admin" component={AdminManager}/>
              <Route path="/worker" component={WorkerPage}/>
              <Route path="/test" component={AllChart}/>
          </MiniDrawer>
        </HashRouter>
    );
  }
}

export default App;
