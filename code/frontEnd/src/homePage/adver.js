import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const tutorialSteps = [
    {
        label: 'One piece 1:)',
        imgPath: require('../img/banner_01.jpg'),
    },
    {
        label: 'one piece 2',
        imgPath: require('../img/timg-3.jpeg'),
    },
    {
        label: 'one piece 3',
        imgPath: require('../img/timg-4.jpeg'),
    },
];

const styles = theme => ({
    root: {
        width:'100%',
        flexGrow: 1,

    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        marginBottom: 20,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 250,
        overflow: 'hidden',
        width: '100%',
    },
    paper:{
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        paddingLeft: theme.spacing.unit * 1,
        paddingRight: theme.spacing.unit * 1,
        opacity:0.9,
    }
});

class SwipeableTextMobileStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(
            prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(
            prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        this.setState({
            activeStep
        });
    };

    render() {
        const { classes, theme } = this.props;
        const { activeStep } = this.state;

        const maxSteps = tutorialSteps.length;

        return (
            <Paper className={classes.paper} elevation={2}>
            <div className={classes.root}>

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.activeStep}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                >
                    {tutorialSteps.map(step => (
                        <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} />
                    ))}
                </SwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep = {activeStep}
                    className = {classes.mobileStepper}
                    nextButton =
                    {
                        <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small"
                                onClick={this.handleBack}
                                disabled={activeStep === 0}>
                            {theme.direction === 'rtl'
                                ? <KeyboardArrowRight />
                                : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            </div>
            </Paper>
        );
    }
}

SwipeableTextMobileStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);