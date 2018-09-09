import React from 'react';
import {
    Button, Form, FormGroup, ControlLabel, FormControl, Glyphicon, Modal, Tooltip, Popover,
    OverlayTrigger
} from 'react-bootstrap';
import {match} from 'react-router-dom'
import Avatar from './userpic'
import Input from "@material-ui/core/es/Input/Input";
import {withStyles} from "@material-ui/core/styles/index";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import VisibilityOff from "@material-ui/icons/es/VisibilityOff";
import Visibility from "@material-ui/icons/es/Visibility";

const styles = theme => ({
    input: {
        marginLeft: theme.spacing.unit,
    },
});
class TextFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: '',
            email: '',
            phone: '',
            show:false,
            showPassword: false,
            inputPwd:'',
            newPwd:'',
            newPwdAgain:'',
            updatePwd:false,
            password:''
        };
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangeEmail=this.handleChangeEmail.bind(this);
        this.handleChangePhone=this.handleChangePhone.bind(this);
        this.showInfo=this.showInfo.bind(this);
        this.open=this.open.bind(this);
        this.close=this.close.bind(this);
        this.handleClickShowPassword=this.handleClickShowPassword.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleChangeNewPwd=this.handleChangeNewPwd.bind(this);
        this.handleChangeNewPwdAgain=this.handleChangeNewPwdAgain.bind(this);
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

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
                        this.setState({
                            name: result[1],
                            pwd: result[2],
                            password: result[2],
                            email: result[3],
                            phone: result[4]
                        });
                    })
            })
    };

    handleChangeName= event =>{
        this.setState({
            name:event.target.value
        });
    };
    handleChangeNewPwd(event){
        this.setState({
            newPwd:event.target.value
        });
    }
    handleChangeNewPwdAgain(event){
        this.setState({
            newPwdAgain:event.target.value
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

    updatePwd =()=>{
        if(this.state.newPwd!==this.state.newPwdAgain){
            alert("两次新密码的输入不一致!");
            return;
        }
        let p1=/[0-9]/;
        let p2=/[a-zA-Z]/i;
        if (!(this.state.newPwd.length >=6
                && p1.test(this.state.newPwd)
                && p2.test(this.state.newPwd))){
            alert("密码不符合格式要求!");
            return;
        }
        fetch('http://localhost:8080/User/PassWordCheck?' +
            'userID='+this.props.userid+
            '&password='+this.state.inputPwd,
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        if(result==="success"){
                            this.setState({
                                password:this.state.newPwd
                            });
                            alert("修改成功！");
                            this.close();
                        }
                        else{
                            alert("旧密码不正确！")
                        }
                    });
            })
    };


    handleInfo= () => {
        if (!(this.state.email.indexOf("@") !== -1
            && (this.state.email.indexOf(".com") !== -1
                || this.state.email.indexOf(".cn") !== -1))){
            alert("邮箱格式不正确！");
            return;
        }
        if (this.state.phone.length!==11){
            alert("电话号码无效！");
            return;
        }
        fetch('http://localhost:8080/User/HandleUserInfoChange?' +
            'userID='+this.props.userid+
            '&username='+ this.state.name+
            '&password='+this.state.password+
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

    close() {
        this.setState({
            showModal: false,
            inputPwd:'',
            newPwd:'',
            newPwdAgain:'',
        });
    }

    open() {
        this.setState({ showModal: true });
    }
    render() {

        const { classes, theme,params } = this.props;
        return (
            <div align ="center">
                <br/>
                <Avatar userid={this.props.userid}/>
                <h5>点击头像框更改头像</h5>
                <br/>
                <Form inline>
                    <FormGroup bsStyle="primary">
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
                    <FormGroup bsStyle="primary">
                        <ControlLabel>密码：</ControlLabel>
                        {' '}
                        <FormControl type="password"
                                     value={this.state.pwd}/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="lock" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>
                <div style = {{textDecoration:"underline",color:"blue"}}>
                    <a onClick={this.open}> 点击修改密码</a>
                </div>
                <br/>
                <Form inline>
                    <FormGroup bsStyle="primary">
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
                    <FormGroup bsStyle="primary">
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





                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>修改密码</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputLabel>{<h5>请输入当前密码：</h5>}</InputLabel>
                        <Input
                            className={classes.input}
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.inputPwd}
                            onChange={this.handleChange('inputPwd')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <br/>
                        <InputLabel>{<h5>请输入新密码：</h5>}</InputLabel>
                        <Input type="password"
                               className={classes.input}
                               onChange={this.handleChangeNewPwd}
                        />
                        <br/>
                        <InputLabel>{<h5>请再次输入新密码确认：</h5>}</InputLabel>
                        <Input type="password"
                               className={classes.input}
                               onChange={this.handleChangeNewPwdAgain}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.updatePwd}>确认</Button>
                        <Button onClick={this.close}>取消</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(TextFields);
