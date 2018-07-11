import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dishes from './Dishes';

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
    state = {
        anchorEl: null,
        selectedIndex: 0,
        content:1,
        windowName:"一餐五楼A窗口",

    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}>
                            <Grid container className={classes.demo} justify="center" spacing={40} >
                                {this.props.dishesList.map((item,i) => (
                                    <Grid item><Dishes key={item.foodId}
                                                       foodId={item.foodId}
                                                       foodname={item.foodName}
                                                       price={item.price}
                                                       tips={item.tips}
                                                       window_name={item.windowName}
                                                       like={item.likes}
                                                       picture=""/>
                                    </Grid>
                                ))}
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
