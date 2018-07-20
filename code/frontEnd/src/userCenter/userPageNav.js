import React, { Component } from 'react';
import TextFields from './personalInfo';
import {Tab, Tabs} from 'react-bootstrap';
import PersonalSetting from "./personalSetting";
import PersonalCollection from "./personalCollection";
import ViewHistoryTable from "./viewhistory";
import PersonalRecommend from "./personalRecommend";
import TipsToTagSetting from "./tipsToTagSetting";

class UserPageNav extends Component {
    render() {
        return (
            <div className="container">
                <br/><br/><br/>
                <div>
                    <Tabs defaultActiveKey={5}>
                        <Tab eventKey={1} title="个人信息" >
                            <TextFields userid={this.props.match.params.key}/>
                        </Tab>
                        <Tab eventKey={2} title="个性化设置" >
                            <PersonalSetting userid={this.props.match.params.key}/>
                        </Tab>
                        <Tab eventKey={3} title="我的收藏" >
                            <PersonalCollection userid={this.props.match.params.key}/>
                        </Tab>
                        <Tab eventKey={4} title="历史浏览记录" >
                            <ViewHistoryTable userid={this.props.match.params.key}/>
                        </Tab>
                        <Tab eventKey={5} title="个性化推荐" >
                            <PersonalRecommend userid={this.props.match.params.key}/>
                        </Tab>

                        <Tab eventKey={6} title="弹窗" >
                            <TipsToTagSetting userid={this.props.match.params.key}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}



export default UserPageNav;
