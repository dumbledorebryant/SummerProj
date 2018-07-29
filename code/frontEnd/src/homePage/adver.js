import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import LinearProgress from '@material-ui/core/LinearProgress';


const advers = [
    {
        label: 'adver1',
        imgPath: null,
    },
    {
        label: 'adver2',
        imgPath: null,
    },
    {
        label: 'adver3',
        imgPath: null,
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
        height: 100,
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
        load:false,
        img:advers
    };

    handleNext = () => {
        this.index++;
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.index--;
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        this.setState({ activeStep });
    };

    index = 0;
    steps = advers.length;
    updateAdver = () =>{
        this.index++;
        this.handleStepChange(this.index%this.steps)
    };
    componentDidMount(){

        fetch('http://localhost:8080/Img/Adver',{
            credentials: 'include',
            method:'GET',
            mode:'cors',
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                for (let i=0;i<3;i++){
                    advers[i].imgPath=result[i];
                }
                this.setState({
                    img:advers,
                    load:true,
                });
                let _this=this;
                setInterval(function(){

                    _this.updateAdver();

                },10000);

            });
        });


    };

    render() {
        const { classes, theme } = this.props;
        const { activeStep } = this.state;

        const maxSteps = advers.length;
        if (this.state.load){
            return (
                <Paper className={classes.paper} elevation={2}>
                <div className={classes.root}>

                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.activeStep}
                        onChangeIndex={this.handleStepChange}
                        enableMouseEvents
                    >
                        {this.state.img.map(step => (
                            <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} />
                        ))}
                    </SwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        className={classes.mobileStepper}
                        nextButton={
                            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
                            </Button>
                        }
                    />

                </div>
                </Paper>
            );
        }
        else{
            return (<p> </p>)
        }
    }
}

SwipeableTextMobileStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);