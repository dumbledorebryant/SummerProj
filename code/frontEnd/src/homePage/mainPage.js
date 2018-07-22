
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import SwipeableTextMobileStepper from './adver'
import ButtonBases from './btn'
import Footer from '../nav/footer'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    paper2:{
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        backgroundColor:'#FAFAFA'
    },
});

function MainPage(props) {
    const {classes} = props;
    return (
        <div>
    <Typography noWrap>
    <Paper className={classes.paper2} elevation={5}>
        <SwipeableTextMobileStepper/>
        </Paper>
    </Typography>
    <ButtonBases/>
        </div>);
}

MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);