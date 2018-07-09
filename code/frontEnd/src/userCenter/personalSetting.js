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
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

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
const tasteTemp=[];
const countryTemp=[];
const tabooTemp=[];


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

const tag=[];
const foodTemp=[];
class PersonalSetting extends Component {
    constructor() {
        super();
        this.state = {
            name:[],
            checkBool:tag,
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

        this.showTags=this.showTags.bind(this);
        this.showTags();
        this.searchSavedTag=this.searchSavedTag.bind(this);
        this.searchSavedTag();
        this.handleChange1=this.handleChange1.bind(this);
        this.handleChange=this.handleChange.bind(this);

        this.sendTag=this.sendTag.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen=this.handleOpen.bind(this);

        this.searchNewAddTag=this.searchNewAddTag.bind(this);
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    showTags= () => {
        fetch('http://localhost:8080/UserCenter/ShowTags?',
            {
                method: 'POST',
                mode: 'cors'
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        tasteTemp.splice(0,tasteTemp.size);
                        countryTemp.splice(0,countryTemp.size);
                        tabooTemp.splice(0,tabooTemp.size);
                        foodTemp.splice(0,foodTemp.size);

                        for(var i in result){
                            this.state.checkBool.push(false);
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
                            tasteTags:tasteTemp,
                            coutryTags:countryTemp,
                            foodTags:foodTemp,
                            tabooTags:tabooTemp }, () => {
                            this.searchSavedTag()
                        });

                    });
            })
    };

    handleChange1 = name => event => {
        console.log("clickBefore:"+this.state.checkBool);
        let i=document.getElementById(name);
        let temp=this.state.checkBool;
        temp[name]=i.checked;
        this.setState({checkBool:temp});
        console.log("clickAfter:"+this.state.checkBool);
    };



    searchSavedTag= () => {
        fetch('http://localhost:8080/UserCenter/SearchSavedTag?userID=1',
            {
                method: 'POST',
                mode: 'cors'
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        console.log("result: ", result);
                        let temp=this.state.checkBool;
                        for(var i in result){
                            console.log("tagID:"+result[i].tagId);
                            let idx=result[i].tagId;
                            temp[idx-1]=true;
                        }
                        this.setState({checkBool:temp});
                    });
            })
    };


    sendTag= () => {
        console.log("finalCheckBool:" + this.state.checkBool + '\n');
        console.log("自定义:" + this.state.chooseType + '\n');
        console.log("自定义:" + this.state.chooseName + '\n');
        let sendArr=[];
        let idx=0;
        for(var i in this.state.checkBool){
            idx++;
            console.log("index:" + this.state.checkBool[i] + '\n');
            if(this.state.checkBool[i]===true){
                console.log("num:" + idx + '\n');
                sendArr.push(idx);
            }
        }
        if(!((this.state.chooseType==='')||(this.state.chooseName===''))){
            sendArr.push(this.state.chooseType);
            sendArr.push(this.state.chooseName);
        }
        console.log("array:" + sendArr + '\n');
        fetch('http://localhost:8080/UserCenter/ChooseTag?userID=1&tagArray='+sendArr,
            {
                method: 'POST',
                mode: 'cors'
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
        fetch('http://localhost:8080/UserCenter/SearchNewAddTag?tagName='+this.state.chooseName,
            {
                method:'POST',
                mode:'cors'
            })
            .then(reponse=>{
                reponse.json()
                    .then(result=>{
                        console.log("NewFetchresult:"+result);
                        let temp=this.state.checkBool;
                        temp.push(true);
                        this.setState({checkBool:temp});
                        let add={"tagType":result.tagType,"tagId":result.tagId,"tagName":result.tagName};
                        console.log("NNN:"+result.tagType);
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
                            console.log("NEWW:"+this.state.foodTags);
                        }


                    })
            })
    };

    handleChange = event => {
        console.log("xialakuang:"+event.target.name+'\n');
        console.log("xiala:"+event.target.value+'\n');
        this.setState({ [event.target.name]: event.target.value });
        this.setState({chooseType:event.target.value});

    };

    handleChange3= event => {
        this.setState({chooseName:event.target.value});
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <br/>
                <br/>
                <Navbar >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">口味标签设置</a>
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
                                            checked={this.state.checkBool[item.tagId-1]}
                                            onChange={this.handleChange1(item.tagId-1)}
                                            id={item.tagId-1}
                                            key={item.tagName}
                                            value={item.tagName}
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
                                                checked={this.state.checkBool[item.tagId-1]}
                                                onChange={this.handleChange1(item.tagId-1)}
                                                id={item.tagId-1}
                                                value={item.tagName}
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
                                            checked={this.state.checkBool[item.tagId-1]}
                                            onChange={this.handleChange1(item.tagId-1)}
                                            id={item.tagId-1}
                                            value={item.tagName}
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
                                                    checked={this.state.checkBool[item.tagId-1]}
                                                    onChange={this.handleChange1(item.tagId-1)}
                                                    id={item.tagId-1}
                                                    value={item.tagName}
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
                <Button bsStyle="info" onClick={this.sendTag}>提交修改</Button>
            </div>


        );
    }
}

PersonalSetting.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonalSetting);




