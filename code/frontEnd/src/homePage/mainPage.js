
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import SwipeableTextMobileStepper from './adver'
import ButtonBases from './btn'
import Footer from '../nav/footer'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {primaryDarkColor, primaryColor,secondaryColor, fontColor} from '../style/style'
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
    title:{
        color:primaryDarkColor,
        textAlign:'center',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    paper2:{
        marginTop:20,
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        backgroundColor:'#FAFAFA'
    },
});

function EatIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z"/>
        </SvgIcon>
    );
}

class MainPage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {classes} = this.props;
            return (
                <div>
                    <Typography component='h1' className={classes.title} style={{textAlign:'center',fontSize:40, fontWidth:200}}>Welcome to EatOrNot</Typography>
                    <div style={{textAlign:'center'}}>
                        <EatIcon
                            className={classes.icon}
                            style={{ fontSize: 50,textAlign:'center',marginBottom:20 ,backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',}}
                            component={svgProps => (
                                <svg {...svgProps}>
                                    <defs>
                                        <linearGradient id="gradient1">
                                            <stop offset="30%" stopColor={primaryDarkColor} />
                                            <stop offset="70%" stopColor={secondaryColor} />
                                        </linearGradient>
                                    </defs>
                                    {React.cloneElement(svgProps.children[0], { fill: 'url(#gradient1)' })}
                                </svg>
                            )}
                        />
                    </div>
                    <Divider/>
            <Typography noWrap>
            <Paper className={classes.paper2} elevation={5}>
                <SwipeableTextMobileStepper/>
                </Paper>
            </Typography>
            <ButtonBases/>
                </div>);
        }
}

MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);