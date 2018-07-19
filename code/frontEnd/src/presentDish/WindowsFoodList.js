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
    }
    state = {
        anchorEl: null,
//        selectedIndex: 0,
//        content:1,
        dishesList:this.props.dishesList,
        windowName:"一餐五楼A窗口",
        userId:-1,
        sort:"默认排序",
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleMenuItemClick = (event, index) => {
        let formData=new FormData();
        var s = JSON.stringify(this.state.dishesList);
        formData.append("foodList",s);
        formData.append("type",index);
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
    };


    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div>
                <div>
                    <Button
                        aria-owns={this.state.anchorE1? 'simple-menu' : null}
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

                    </Menu>
                    <div>
                        <TagList addClickTag={this.props.addClickTag} delClickTag={this.props.delClickTag}/>
                    </div>


                    <Grid container className={classes.root} spacing={16} >
                            <Grid container spacing={24} justify="left">
                                {this.state.dishesList.map((item,i) => (
                                    <Grid>
                                        <Dishes id={item.foodId} userId={this.props.userId} key={item.foodId} foodId={item.foodId} foodname={item.foodName}price={item.price}tips={item.tips}window_name={item.windowName} like={item.likes} picture=""Tags={item.Tags}/>
                                    </Grid>))
                                }
                                </Grid>
                    </Grid>
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