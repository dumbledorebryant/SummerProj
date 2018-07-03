import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import constantData from './window.json';
import Avatar from '@material-ui/core/Avatar';
import PageviewIcon from '@material-ui/icons/Pageview';
import RecipeReviewCard from './dishes';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 260,
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



const options = [
    '全部',
    'A窗口',
    'B窗口',
    'C窗口',
];




class SimpleListMenu extends React.Component {
    button = null;
    constructor(prop) {
        super(prop);
    }
    state = {
        anchorEl: null,
        selectedIndex: 0,
        content:1,
        window:this.props.windows

    };

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, anchorEl: null, content:index
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        let list=this.state.window.map((item,i) => (
            (0==this.props.index)?<RecipeReviewCard />:
            (options[this.state.selectedIndex]=="全部"&& item.floor==this.props.index)?<div><label>{item.name}</label><RecipeReviewCard /></div>:
                ((item.name==options[this.state.selectedIndex] && item.floor==this.props.index)?<div className={classes.row}><RecipeReviewCard /></div>:<label></label>
        )))
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
                <div>
                    {list}
                    <Avatar className={classes.pinkAvatar}>
                        <PageviewIcon />
                    </Avatar>

                </div>
            </div>
        );
    }
}

SimpleListMenu.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(SimpleListMenu);