import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dishes from './Dishes';

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

    };

    handleClickListItem = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleMenuItemClick = (event, index) => {
        alert(index);
        this.setState({
            selectedIndex: index,
            anchorEl: null, content:index
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div>
                <div>
                    <Grid container className={classes.root} spacing={16} >
                            <Grid container spacing={24} justify="left">
                                {this.props.dishesList.map((item,i) => (
                                    <Grid>
                                        <Dishes key={item.foodId} foodId={item.foodId} foodname={item.foodName}price={item.price}tips={item.tips}window_name={item.windowName} like={item.likes}picture=""/>
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
