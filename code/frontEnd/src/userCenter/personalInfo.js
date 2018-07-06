import React from 'react';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Glyphicon} from 'react-bootstrap';
import protrait from '../img/pic.jpg'




class TextFields extends React.Component {

    constructor(props) {
        super();
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
        this.showInfo();


    }
    showInfo= () => {
        fetch('http://localhost:8080/User/UserInfo?userID=1',
            {
                method: 'POST',
                mode: 'cors'
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        this.setState({name:result.username});
                        this.setState({pwd:result.password});
                        this.setState({email:result.email});
                        this.setState({phone:result.phone});
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
        this.setState({pwd:event.target.value});
    }
    handleChangeEmail(event){
        this.setState({email:event.target.value});
    }
    handleChangePhone(event){
        this.setState({phone:event.target.value});
    }

    handleInfo= () => {
        fetch('http://localhost:8080/User/HandleUserInfoChange?userID=1&username='+
            this.state.name+'&password='+this.state.pwd+'&phone='+this.state.phone+'&email='+
            this.state.email,
            {
                method: 'POST',
                mode: 'cors'
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
        return (
            <div align="center">
                <br/>
                <br/>
                <Image src={protrait} width={"100px"}  height={"100px"}  circle />
                <br/>
                <br/>

                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"  bsStyle="primary">
                        <ControlLabel>昵称：</ControlLabel>
                        {' '}
                        <FormControl type="text" value={this.state.name}
                                     onChange={this.handleChangeName}/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="user" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>


                <br/>

                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"  bsStyle="primary">
                        <ControlLabel>密码：</ControlLabel>
                        {' '}
                        <FormControl type="password" value={this.state.pwd}
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
                        <FormControl type="text" value={this.state.phone}
                                     onChange={this.handleChangePhone}/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="earphone" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>

                <br/>

                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"  bsStyle="primary">
                        <ControlLabel>邮箱：</ControlLabel>
                        {' '}
                        <FormControl type="text" value={this.state.email}
                                     onChange={this.handleChangeEmail}/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="envelope" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>
                <br/>
                <Button bsStyle="primary" onClick={this.handleInfo}>提交修改</Button>

            </div>

        );
    }
}


export default TextFields
