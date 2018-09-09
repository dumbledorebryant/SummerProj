import React from 'react'
import {Row, Col} from "react-bootstrap";
import {Tab} from 'react-bootstrap'
import {Nav, NavItem} from "react-bootstrap";
import UserManager from "./AdminOperations/UserManager";
import MenuManager from "./AdminOperations/MenuManager";
import CommentManager from "./AdminOperations/CommentManager";
import CounterSimulation from "./AdminOperations/CounterSimulation";


class AdminManager extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            login:false
        }
    }

    componentWillMount(){
        fetch('http://localhost:8080/Admin/State',{
            credentials: 'include',
            method:'GET',
            mode:'cors',

        }).then(response=>{
            console.log('Request successful',response);
            return response.text().then(result=>{
                if (result!=="-1\n" ){
                    this.setState({login:true});
                }
            });
        });
    }

    render(){
        if (this.state.login){
        return(
            <div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="clearfix">
                        <Col md={3}>
                            <Nav bsStyle="pills" stacked>
                                <NavItem eventKey="first">
                                    UserManage
                                </NavItem>
                                <NavItem eventKey="second">
                                    MenuManage
                                </NavItem>
                                <NavItem eventKey="third">
                                    CommentManage
                                </NavItem>
                                <NavItem eventKey="fourth">
                                    CounterSimulation
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col md={9}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="first">
                                    <UserManager/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <MenuManager/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <CommentManager/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <CounterSimulation/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )}
        else{
            return (<p>please login</p>)
        }
    }
}

export default AdminManager;