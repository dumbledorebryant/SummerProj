import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
<<<<<<< HEAD
import WindowsFoodList from './WindowsFoodList'
=======
import Window from './Window';

>>>>>>> dc8191da713439efe75e3b5dd6e8022ee1581e0a
const styles = theme => ({
    root: {
        width: '20%',
      //  maxWidth: '80%',
        backgroundColor: theme.palette.background.paper,
        flexFlow:1
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

    state = {
        anchorEl: null,
        selectedIndex: 0,
        content:1,
        floor:this.props.floor,        //上一级传过来的，拿来去后端拿windowList和dishesList，如果是0就取全部
        windowList:this.props.windowList,//渲染windowMenu的按钮
        dishesList: [],      //从后端拿到，传给下一级的windowFoodList
        comment:[],
    };

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
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
                    content:index
                });
            })
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

   componentWillMount(){
        let formData=new FormData();
        formData.append("restaurant",this.props.canteen);
        formData.append("floor",this.state.floor);
        formData.append("windowId",0);
        fetch('http://localhost:8080/Food/FoodsByWindowId',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                    this.setState({dishesList:result});
            })
        });
    }//render之前，construct之后*/

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
<<<<<<< HEAD
                                primary={this.state.selectedIndex === 0
                                ||this.state.selectedIndex > this.props.windowList.length
                                    ?"All"
                                    :this.props.windowList[this.state.selectedIndex - 1].windowName}
=======
                                primary={this.state.selectedIndex==0||this.state.selectedIndex>this.props.windowList.length?"All窗口":this.props.windowList[this.state.selectedIndex-1].windowName+"窗口"}
>>>>>>> dc8191da713439efe75e3b5dd6e8022ee1581e0a
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
                        <Window dishesList={this.state.dishesList}/>
                    </div>
                </div>
            </div>
        );
    }
}

WindowsMenu.propTypes = {
    classes: PropTypes.object.isRequired,

};

<<<<<<< HEAD
export default withStyles(styles)(WindowsMenu);
=======
export default withStyles(styles)(WindowsMenu);
>>>>>>> dc8191da713439efe75e3b5dd6e8022ee1581e0a
