import React from 'react'
import {Row, Col} from "react-bootstrap";
import {Tab} from 'react-bootstrap'
import {Nav, NavItem} from "react-bootstrap";
import UserManager from "./AdminOperations/UserManager";
import MenuManager from "./AdminOperations/MenuManager";
import CommentManager from "./AdminOperations/CommentManager";


class AdminManager extends React.Component
{
    render(){
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
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default AdminManager;