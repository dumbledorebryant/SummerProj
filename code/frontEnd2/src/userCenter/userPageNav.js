import React, { Component } from 'react';
import TextFields from './personalInfo';
import {Col, Row,Nav,NavItem,Tab,Tabs} from 'react-bootstrap';
import PersonalSetting from "./personalSetting";

class UserPageNav extends Component {
    constructor() {
        super();
        this.state = {
            name:"123"
        };
    }

    render() {

        return (
            <div className="container">
                <br/>
                <br/>
                <br/>
                <div>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="个人信息" >
                            <TextFields/>
                        </Tab>
                        <Tab eventKey={2} title="个性化设置" >
                            <PersonalSetting/>
                        </Tab>
                        <Tab eventKey={3} title="我的收藏" >

                        </Tab>
                    </Tabs>
                </div>,
            </div>
        );
    }
}



export default UserPageNav;
