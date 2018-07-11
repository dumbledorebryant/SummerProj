import React from 'react';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Glyphicon} from 'react-bootstrap';
import {match} from 'react-router-dom'
import Avatar from './userpic'

class TextFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: '',
            email: '',
            phone: ''
        };
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangePwd=this.handleChangePwd.bind(this);
        this.handleChangeEmail=this.handleChangeEmail.bind(this);
        this.handleChangePhone=this.handleChangePhone.bind(this);
        this.showInfo=this.showInfo.bind(this);
    }

    componentWillMount(){
        this.showInfo();
    }

    showInfo= () => {
        fetch('http://localhost:8080/User/UserInfo',
            {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        this.setState({name:result[1]});
                        this.setState({pwd:result[2]});
                        this.setState({email:result[3]});
                        this.setState({phone:result[4]});
                        console.log("result: ", result);

                    });
            })
    };

    handleChangeName= event =>{
        this.setState({
            name:event.target.value
        });
    };
    handleChangePwd(event){
        this.setState({
            pwd:event.target.value
        });
    }
    handleChangeEmail(event){
        this.setState({
            email:event.target.value
        });
    }
    handleChangePhone(event){
        this.setState({
            phone:event.target.value
        });
    }

    handleInfo= () => {
        fetch('http://localhost:8080/User/HandleUserInfoChange?' +
            'userID='+this.props.userid+
            '&username='+ this.state.name+
            '&password='+this.state.pwd+
            '&phone='+this.state.phone+
            '&email='+ this.state.email,
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',

            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        alert(result);
                    });
            })
    };

    render() {
        const { classes, theme,params } = this.props;
        return (
            <div align ="center">
                <br/>
                <Avatar userid={this.props.userid}/>
                <h5>点击头像框更改头像</h5>
                <br/>
                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"
                               bsStyle="primary">
                        <ControlLabel>昵称：</ControlLabel>
                        {' '}
                        <FormControl type="text"
                                     value={this.state.name}
                                     onChange={this.handleChangeName}/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="user" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>
                <br/>
                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"
                               bsStyle="primary">
                        <ControlLabel>密码：</ControlLabel>
                        {' '}
                        <FormControl type="password"
                                     value={this.state.pwd}
                                     onChange={this.handleChangePwd}/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="lock" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>
                <br/>
                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"  bsStyle="primary">
                        <ControlLabel>手机：</ControlLabel>
                        {' '}
                        <FormControl type="text"
                                     value={this.state.phone}
                                     onChange={this.handleChangePhone}/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="earphone" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>
                <br/>
                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"
                               bsStyle="primary">
                        <ControlLabel>邮箱：</ControlLabel>
                        {' '}
                        <FormControl type="text"
                                     value={this.state.email}
                                     onChange={this.handleChangeEmail}/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="envelope" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>
                <br/>
                <Button bsStyle = "primary"
                        onClick = {this.handleInfo}>
                    提交修改
                </Button>
            </div>
        );
    }
}


export default TextFields
