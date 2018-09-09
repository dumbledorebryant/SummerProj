import React, { Component } from 'react';
import {Navbar, Button, Col, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from "@material-ui/core/es/FormGroup/FormGroup";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import Input from "@material-ui/core/es/Input/Input";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import {Link,hashHistory} from 'react-router-dom';

const theme2=createMuiTheme({
    typography:{
        fontSize:20,
    },
    palette: {
        primary: {
            light: '#039be5',
            main: '#63ccff',
            dark: '#006db3',
            contrastText: '#424242',
        },
        secondary: {
            light: '#fb8c00',
            main: '#ffbd45',
            dark: '#c25e00',
            contrastText: '#424242',
        },

    },
});

const styles = theme => ({
    root: {
        display: 'flex',
        align:"center"
    },
    formControl: {
        margin: theme.spacing.unit * 2,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    choice: {
        margin: theme.spacing.unit*0.01 ,
    },
    input: {
        margin: theme.spacing.unit,
    },
    formControl2: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    formControl3: {
        margin: theme.spacing.unit*1.5,
    },
});


const foodTemp=[];
const tasteTemp=[];
const countryTemp=[];
const tabooTemp=[];
class PersonalSetting extends React.Component {
    constructor(props) {
        super(props);
        this.showTags=this.showTags.bind(this);
        this.searchSavedTag=this.searchSavedTag.bind(this);
        this.handleChange1=this.handleChange1.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.sendTag=this.sendTag.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.searchNewAddTag=this.searchNewAddTag.bind(this);
    }
    state = {
        name:[],
        checkBool:[],
        arr:[],
        allTags:'',
        tasteTags:tasteTemp,
        countryTags:countryTemp,
        tabooTags:tabooTemp,
        foodTags:foodTemp,
        open: false,
        choose:'',
        chooseType:'',
        chooseName:''
    };

    componentDidMount(){
        this.showTags();
        this.searchSavedTag();
    }
    handleClose = () => {
        this.setState({
            open: false
        });
    };

    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    showTags= () => {
        fetch('http://localhost:8080/Tag/ShowTags',
            {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        let tasteTemp=[];
                        let countryTemp=[];
                        let tabooTemp=[];
                        let foodTemp=[];
                        let checkBoolTemp=[];
                        for(let i in result){
                            checkBoolTemp[result[i].tagId]=false;
                            let add={"tagType":result[i].tagType,
                                "tagId":result[i].tagId,"tagName":result[i].tagName};
                            if(result[i].tagType==='taste'){
                                tasteTemp.push(add);
                            }
                            else if(result[i].tagType==='country'){
                                countryTemp.push(add);
                            }
                            else if(result[i].tagType==='taboo'){
                                tabooTemp.push(add);
                            }
                            else if(result[i].tagType==='food'){
                                foodTemp.push(add);
                            }
                        }
                        this.setState({
                            checkBool:checkBoolTemp,
                            tasteTags:tasteTemp,
                            countryTags:countryTemp,
                            foodTags:foodTemp,
                            tabooTags:tabooTemp }, () => {
                            this.searchSavedTag()
                        });
                    });
            })
    };

    handleChange1 = item => event => {
        console.log("checkBoolBefore:"+this.state.checkBool);
        console.log("checkBoolItem:"+item.checked);
        let temp=this.state.checkBool;
        let ele = document.getElementById(item.tagId);
        temp[item.tagId]=ele.checked;
        this.setState({checkBool:temp});
    };

    searchSavedTag= () => {
        fetch('http://localhost:8080/UserTag/SearchSavedTag?' +
            'userID='+this.props.userid,
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        let temp=this.state.checkBool;
                        for(let i in result){
                            let idx=result[i].tagId;
                            temp[idx]=true;
                        }
                        this.setState({
                            checkBool:temp
                        });
                    });
            })
    };

    sendTag= () => {
        let sendArr=[];
        for(let i in this.state.checkBool){
            if(this.state.checkBool[i]===true){
                sendArr.push(i);
            }
        }
        if(!((this.state.chooseType==='')||(this.state.chooseName===''))){
            sendArr.push(this.state.chooseType);
            sendArr.push(this.state.chooseName);
        }
        fetch('http://localhost:8080/UserTag/ChooseTag?' +
            'userID='+this.props.userid+
            '&tagArray='+sendArr,
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                        if(!((this.state.chooseType==='')||(this.state.chooseName===''))){
                            this.searchNewAddTag();
                        }
                    });
            })
    };

    searchNewAddTag=()=>{
        fetch('http://localhost:8080/UserTag/SearchNewAddTag?' +
            'tagName='+this.state.chooseName,
            {
                credentials: 'include',
                method:'POST',
                mode:'cors',

            })
            .then(reponse=>{
                reponse.json()
                    .then(result=>{
                        let temp=this.state.checkBool;
                        temp[result.tagId]=true;
                        this.setState({
                            checkBool:temp
                        });
                        let add={"tagType":result.tagType,"tagId":result.tagId,"tagName":result.tagName};
                        if(result.tagType==="taste"){
                            let temp2=this.state.tasteTags;
                            temp2.push(add);
                            this.setState({tasteTags:temp2});
                        }
                        else if(result.tagType==="country"){
                            let temp2=this.state.countryTags;
                            temp2.push(add);
                            this.setState({countryTags:temp2});
                        }
                        else if(result.tagType==="taboo"){
                            let temp2=this.state.tabooTags;
                            temp2.push(add);
                            this.setState({tabooTags:temp2});
                        }
                        else if(result.tagType==="food"){
                            let temp2=this.state.foodTags;
                            temp2.push(add);
                            this.setState({foodTags:temp2});
                        }


                    })
            })
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        this.setState({
            chooseType:event.target.value
        });

    };

    handleChange3= event => {
        this.setState({
            chooseName:event.target.value
        });
    };

    render() {
        const { classes,match } = this.props;
        return (
            <div>
                <br/>
                <br/>
                <Navbar >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">标签设置</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>

                <MuiThemeProvider theme={theme2}>
                <Row>
                    <Col md={2}>
                        <div className={classes.formControl3}>
                        {"自定义标签设置"}
                        </div>
                    </Col>

                    <Col md={2}>
                        <form autoComplete="off">
                            <FormControl className={classes.formControl2}>
                                <Select
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    onOpen={this.handleOpen}
                                    value={this.state.choose}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'choose',
                                        id: 'demo-controlled-open-select',
                                    }}
                                >
                                    <MenuItem value='taste'>口味</MenuItem>
                                    <MenuItem value='country'>国家</MenuItem>
                                    <MenuItem value='taboo'>禁忌</MenuItem>
                                    <MenuItem value='food'>食材</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </Col>
                    <Col md={2}>
                        <Input bsSize="large"
                               placeholder="输入自定义标签"
                               className={classes.input}
                               onChange={this.handleChange3}
                        />
                    </Col>
                </Row>
                </MuiThemeProvider>
                <br/>
                <div className={classes.root} >
                    <FormControl component="fieldset" required className={classes.formControl}>
                        <Row>
                        <Col md={3}>
                        <FormLabel component="legend"><h5>口味</h5></FormLabel>
                        <FormGroup className={classes.group}>{
                            this.state.tasteTags.map(function (item) {
                                return <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={this.state.checkBool[item.tagId]}
                                            onChange={this.handleChange1(item)}
                                            key={item.tagName}
                                            value={item.tagName}
                                            id={item.tagId}
                                        />
                                    }
                                    label={<h4>{item.tagName}</h4>}
                                />
                            },this)
                        }
                        </FormGroup>
                        </Col>
                        <Col md={3}>
                        <FormLabel component="legend"><h5>种类</h5></FormLabel>
                            <FormGroup className={classes.group}>{
                                this.state.countryTags.map(function (item) {
                                    return <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={this.state.checkBool[item.tagId]}
                                                onChange={this.handleChange1(item)}
                                                key={item.tagName}
                                                value={item.tagName}
                                                id={item.tagId}
                                            />
                                        }
                                        label={<h4>{item.tagName}</h4>}
                                    />
                                },this)
                            }
                            </FormGroup>
                        </Col>
                    <Col md={3}>
                        <FormLabel component="legend"><h5>禁忌</h5></FormLabel>
                        <FormGroup className={classes.group}>{
                            this.state.tabooTags.map(function (item) {
                                return <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={this.state.checkBool[item.tagId]}
                                            onChange={this.handleChange1(item)}
                                            value={item.tagName}
                                            id={item.tagId}
                                        />
                                    }
                                    label={<h4>{item.tagName}</h4>}
                                />
                            },this)
                        }
                        </FormGroup>
                    </Col>
                            <Col md={3}>
                                <FormLabel component="legend"><h5>食材</h5></FormLabel>
                                <FormGroup className={classes.group}>{
                                    this.state.foodTags.map(function (item) {
                                        return <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={this.state.checkBool[item.tagId]}
                                                    onChange={this.handleChange1(item)}
                                                    value={item.tagName}
                                                    id={item.tagId}
                                                />
                                            }
                                            label={<h4>{item.tagName}</h4>}
                                        />
                                    },this)
                                }
                                </FormGroup>
                            </Col>
                        </Row>
                    </FormControl>
                </div>
                <Button bsStyle="info"
                        onClick={this.sendTag}>
                    提交修改
                </Button>
            </div>
        );
    }
}

PersonalSetting.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalSetting);




