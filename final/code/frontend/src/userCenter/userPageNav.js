import React, { Component } from 'react';
import TextFields from './personalInfo';
import {Tab, Tabs} from 'react-bootstrap';
import PersonalSetting from "./personalSetting";
import PersonalCollection from "./personalCollection";
import ViewHistoryTable from "./viewhistory";
import PersonalRecommend from "./personalRecommend";
import TipsToTagSetting from "./tipsToTagSetting";

class UserPageNav extends Component {
    state={
        login:false
    };
    componentWillMount(){
        fetch('http://localhost:8080/User/State',{
            credentials: 'include',
            method:'GET',
            mode:'cors',

        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                if (result[0]!=="-1" ){
                    this.setState({login:true});
                }
            });
        });
    };
    render() {
        if (this.state.login===true){
        return (
            <div className="container">
                <br/><br/><br/>
                <div>
                    <Tabs defaultActiveKey={1}>
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
                    </Tabs>
                </div>
            </div>
        );
        }
        else{
            return(
                <p>please login</p>
            )
        }
    }
}



export default UserPageNav;
