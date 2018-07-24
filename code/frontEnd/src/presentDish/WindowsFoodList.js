import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Dishes from './Dishes';
import TagList from './Tag';
import classnames from "classnames";
import {Pagination} from "antd";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";



const styles = theme => ({
    root: {
        width: '105%',
        backgroundColor: theme.palette.background.paper,

    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },

});

const option=[
    "默认排序",
    "收藏量从低到高",
    "收藏量从高到低",
    "价格从低到高",
    "价格从高到低",
];

const tagtype=[
    "taste",
    "country",
    "food",
    "taboo"
];

class WindowsFoodList extends React.Component {
    button = null;
    constructor(props) {
        super(props);
        this.clickLike=this.clickLike.bind(this);
        this.arrange = this.arrange.bind(this);
        this.handlePageSelect = this.handlePageSelect.bind(this);
    }
    state = {
        anchorEl: null,
        dishesList:this.props.dishesList,
        windowName:"一餐五楼A窗口",
        userId:-1,
        sort:"默认排序",

        like: [],
        likeFoodInfo: [],
        current:1,
        pageNum:0,
        likeFoodInfoGroup:[]

    };

    componentWillMount(){
        this.arrange(this.state.dishesList);
    }

    handlePageSelect(eventKey) {
        this.setState({
            activePage: eventKey
        });
    }


    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleMenuItemClick = (event, index) => {
        let formData=new FormData();
        var s = JSON.stringify(this.state.dishesList);
        formData.append("foodList",s);
        formData.append("type",index );
        fetch('http://localhost:8080/Food/SortFood',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({
                    dishesList:result,
                    anchorEl: event.currentTarget, //content:index
                    sort:option[index]
                });
                this.arrange(result);
            })
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            userId:this.state.userId,
            dishesList:nextProps.dishesList
        });
        this.arrange(nextProps.dishesList);
    };

    clickLike(index,action){
        let temp = this.state.dishesList;
        var a = this.state.dishesList[index].likes+action;
        temp[index].likes=a;
        this.setState({
            dishesList:temp,
        })
    }

    arrange=(data)=>{
        let result = data;
        let likeList = [];
        let foodListGroup=[];
        let groupNum=0;
        let j = 5;
        if(result.length % j === 0){
            groupNum=result.length/j;//groupNum:页数
        }
        else {
            groupNum = (parseInt(result.length/j) + 1);
        }
        for(let k = 0;k < groupNum;k++) {//分页
            foodListGroup[k] = [];
        }
        for(let i in result){
            let idx = parseInt(i / j) ;
            foodListGroup[idx].push(result[i]);
        }
        this.setState({
            likeFoodInfo: foodListGroup.length>0?foodListGroup[0]:[],
            like: likeList,
            pageNum:groupNum,
            likeFoodInfoGroup:foodListGroup
        })
    };

    onPageChange = (page) => {
        let temp=this.state.likeFoodInfoGroup[page-1];
        this.setState({
            current: page,
            likeFoodInfo:temp
        });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div>
                    <Button
                        aria-owns={this.state.anchorEl? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        {this.state.sort}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={event=>this.handleMenuItemClick(event,0)}>{option[0]}</MenuItem>
                        <MenuItem onClick={event=>this.handleMenuItemClick(event,1)}>{option[1]}</MenuItem>
                        <MenuItem onClick={event=>this.handleMenuItemClick(event,2)}>{option[2]}</MenuItem>
                        <MenuItem onClick={event=>this.handleMenuItemClick(event,3)}>{option[3]}</MenuItem>
                        <MenuItem onClick={event=>this.handleMenuItemClick(event,4)}>{option[4]}</MenuItem>

                    </Menu> <Pagination current={this.state.current}
                                        onChange={this.onPageChange}
                                        total={this.state.pageNum*10}/>
                    <div align ="center">
                        <TagList addClickTag={this.props.addClickTag} delClickTag={this.props.delClickTag}/>
                    </div>


                    <div>
                        <MuiThemeProvider>
                            <Grid container className={classes.root} spacing={16} >
                                <Grid container spacing={24} justify="left">
                                    {this.state.likeFoodInfo.map((item,i)=>(
                                        <Grid>
                                            <Dishes id={item.foodId} userId={this.props.userId} key={item.foodId}
                                                    foodId={item.foodId} foodname={item.foodName} price={item.price}
                                                    tips={item.tips} window_name={item.windowName} like={item.likes}
                                                    picture="" Tags={item.Tags} clickLike={this.clickLike} idx={(this.state.current-1)*5+i}/>
                                            </Grid>))
                                    }
                                </Grid>
                            </Grid>
                        </MuiThemeProvider>
                        <div align ="center">
                            <Pagination current={this.state.current}
                                        onChange={this.onPageChange}
                                        total={this.state.pageNum*10}/>
                        </div>
                        <br/><br/>
                    </div>

            </div>
        );
    }
}
WindowsFoodList.propTypes = {
    classes: PropTypes.object.isRequired,

};
export default withStyles(styles)(WindowsFoodList);
/*
*
                    <Grid container className={classes.root} spacing={16} >
                            <Grid container spacing={24} justify="left">
                                {this.state.dishesList.map((item, i) => (
                                    <Grid>
                                        <Dishes id={item.foodId} userId={this.props.userId} key={item.foodId}
                                                foodId={item.foodId} foodname={item.foodName} price={item.price}
                                                tips={item.tips} window_name={item.windowName} like={item.likes}
                                                picture="" Tags={item.Tags} clickLike={this.clickLike} idx={i}/>
                                    </Grid>))
                                }
                                </Grid>
                    </Grid>


                    <TextField
                        className={classes.search}
                        id="search"
                        style={{backgroundColor:'#26c3fe' ,paddingLeft:5 }}
                        InputProps={{
                             disableUnderline: true,
                            startAdornment: (
                                <InputAdornment  position="start">
                                    <SearchIcon id="searchBtn" onClick={this.onHandleSearch}/>
                                </InputAdornment>
                            ),
                        }}
                        onFocus={this.onFocusSearch}
                        onBlur={this.onBlurSearch}
                    />


                    <Button
                        aria-owns={this.state.anchorE1? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        {tagtype[0]}
                    </Button>

                    <Button
                        aria-owns={this.state.anchorE1? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        {tagtype[1]}
                    </Button>

                    <Button
                        aria-owns={this.state.anchorE1? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        {tagtype[2]}
                    </Button>

                    <Button
                        aria-owns={this.state.anchorE1? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        {tagtype[3]}
                    </Button>
* */