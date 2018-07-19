import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Window from './Window';

const styles = theme => ({
    root: {
        margin:10,
        width: '20%',
        backgroundColor: theme.palette.background.paper,
        flexFlow:1,
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

class WindowsMenu extends React.Component {
    button = null;
    /*
    constructor(props) {
        super(props);
    }
    */
    state = {
        anchorEl: null,
        selectedIndex: 0,
        content:1,
        floor:this.props.floor,        //上一级传过来的，拿来去后端拿windowList和dishesList，如果是0就取全部
        windowList:this.props.windowList,//渲染windowMenu的按钮
        dishesList: [],      //从后端拿到，传给下一级的windowFoodList
        commentList:[],
        windowId:0,
        ChooseTag:[],
    };

    handleClickListItem = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleMenuItemClick = (event, index, windowId) => {
        let formData=new FormData();
        formData.append("restaurant",this.props.canteen);
        formData.append("floor",this.props.floor);
        formData.append("windowId",windowId);
        fetch('http://localhost:8080/Food/FoodsByWindowId',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({
                    dishesList:result,
                    selectedIndex: index,
                    anchorEl: null,
                    content:index,
                    windowId:windowId,
                    floor:this.props.floor,
                });
            })
        });
        fetch('http://localhost:8080/Comment/AllCommentByWindowId',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response2=>{
            console.log('Request successful',response2);
            return response2.json().then(result2=>{
                this.setState({
                    commentList:result2,
                });
            })
        });
    };


    AddClickTag (tagId){
        let temp = this.state.ChooseTag;
        temp.push(tagId);
        this.setState({
            ChooseTag :temp
        })
    };

    DeleteClickTag (tagId){
        let temp = this.state.ChooseTag;
        let index=0;
        for(let i=0;i<temp.length;i++){
            if(tagId===temp[i]){index=i;}
        }
        temp.splice(index);
        this.setState({
            ChooseTag :temp
        })
    };


    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    componentWillMount(){
        let formData=new FormData();
        formData.append("restaurant",this.props.canteen);
        formData.append("floor",this.state.floor);
        if (this.props.windowId !== null){
            formData.append("windowId",this.props.windowId);
            let i=0;
            let temp=this.state.windowList;
            for (i;i<temp.length;i++){
                if (temp[i].window_id===this.props.windowId ||temp[i].windowd===this.props.windowId){
                    this.setState({
                        selectedIndex:i+1,
                        windowId:this.props.windowId
                    });
                    break;
                }
            }
        }
        else{
            formData.append("windowId",0);
        }
        fetch('http://localhost:8080/Food/FoodsByWindowId',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                    this.setState({
                        dishesList:result
                    });
            })
        });
    }//render之前，construct之后*/

    componentWillReceiveProps = (nextProps)=>{
        let formData=new FormData();
        formData.append("restaurant",this.props.canteen);
        formData.append("floor",this.state.floor);
        if (nextProps.windowId !== null){
            formData.append("windowId",nextProps.windowId);
            let i=0;
            let temp=nextProps.windowList;
            for (i;i<temp.length;i++){
                if (temp[i].window_id===nextProps.windowId || temp[i].windowId===parseInt(nextProps.windowId)){
                    this.setState({
                        selectedIndex:i+1,
                        windowId:nextProps.windowId
                    });
                    break;
                }
            }
        }
        else{
            formData.append("windowId",0);
            this.setState({
                selectedIndex:0,
                windowId:0
            });
        }
        fetch('http://localhost:8080/Food/FoodsByWindowId',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({
                    dishesList:result,
                });
            })
        });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div>
                <div className={classes.root}>
                    <List component="nav">
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="When device is locked"
                            onClick={this.handleClickListItem}
                        >
                            <ListItemText
                                primary={this.state.selectedIndex===0||this.state.selectedIndex>this.props.windowList.length?"All窗口":this.props.windowList[this.state.selectedIndex-1].windowName+"窗口"}
                            />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem
                            key="All"
                            selected={0 === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, 0 , 0)}
                        >
                            All
                        </MenuItem>
                        {this.props.windowList.map((option, index) => (
                            <MenuItem
                                key={this.props.canteen+option.windowName}
                                selected={index+1 === this.state.selectedIndex}
                                onClick={event => this.handleMenuItemClick(event, index+1, option.windowId)}
                            >
                                {option.windowName}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <div>
                    <div>
                        <Window dishesList={this.state.dishesList} windowId={this.state.windowId} commentList={this.state.commentList}/>
                    </div>
                </div>
            </div>
        );
    }
}

WindowsMenu.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(WindowsMenu);
