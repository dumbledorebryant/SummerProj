import React, { Component } from 'react';
import TextFields from './personalInfo';
import {Tab, Tabs} from 'react-bootstrap';
import PersonalSetting from "./personalSetting";

const tagData=[];
class UserPageNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"123",
            tag:tagData,
            tagTaste:'无',
            tagCountry:'无',
            tagTaboo:'无',

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
                            <TextFields userid={this.props.match.params.key}/>
                        </Tab>
                        <Tab eventKey={2} title="个性化设置" >
                            <PersonalSetting tagTaste={this.state.tagTaste}
                                             tagCountry={this.state.tagCountry}
                                             tagTaboo={this.state.tagTaboo}
                                             userid={this.props.match.params.key}
                            />
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
