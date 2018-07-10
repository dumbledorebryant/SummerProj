import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import constantData from './window.json';
import Avatar from '@material-ui/core/Avatar';
import PageviewIcon from '@material-ui/icons/Pageview';
import Dishes from './Dishes';
import GuttersGrid from './GuttersGrid';

const styles = theme => ({
    root: {
        width: '500%',
        maxWidth: 1260,
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


class WindowsFoodList extends React.Component {
    button = null;
    constructor(props) {
        super(props);
    }
    state = {
        anchorEl: null,
        selectedIndex: 0,
        content:1,
        windowName:"一餐五楼A窗口",
    //    window:this.props.windows

    };

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        alert(index);
        this.setState({ selectedIndex: index, anchorEl: null, content:index
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div>
                <div>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}>
                            <Grid container className={classes.demo} justify="center" spacing={40} >
                                {this.props.dishesList.map((item,i) => (
                                    <Grid item><Dishes foodId={item.foodId} foodname={item.foodName}price={item.price}tips={item.tips}window_name={item.windowName} like={item.likes}picture=""/></Grid>))
                                }
                                </Grid>
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
                primary={options[this.state.selectedIndex]}
            />
        </ListItem>
    </List>
    <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
    >
        {options.map((option, index) => (
            <MenuItem
                key={option}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
            >
                {option}
            </MenuItem>

        ))}
    </Menu>
</div>
*/
/*
                 <Avatar className={classes.pinkAvatar}>
                        <PageviewIcon />
                    </Avatar>
                    */