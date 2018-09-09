import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import StoreIcon from '@material-ui/icons/Store';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 50,
        width: '100%',
        //textAlign:'center',
        marginTop:20,
    },
    title:{
        marginTop:20,
        marginLeft:50,
       // textAlign:'center',
    },
    image: {
        position: 'relative',
        marginLeft:30,
        marginRight:20,
        marginBottom:30,
        height: 160,
        borderRadius:20,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 20,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',

            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
        borderRadius:20,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        borderRadius:20,
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.3,
        transition: theme.transitions.create('opacity'),
        borderRadius:20,
    },
    imageTitle: {
        position: 'relative',
        padding:20,
    },
    imageMarked: {
        height: 100,
        width: 150,
        opacity:0,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left:-40,
        top:-40,
        transition: theme.transitions.create('opacity'),
        borderRadius:20,
    },
});

let images = [
    {
        url: null,
        title: 'canteen one',
        index:'one',
        width: '20%',
    },
    {
        url: null,
        title: 'canteen two',
        index:'two',
        width: '20%',
    },
    {
        url: null,
        title: 'canteen three',
        index:'three',
        width: '20%',
    },
    {
        url: null,
        title: 'canteen four',
        index:'four',
        width: '20%',
    },
    {
        url: null,
        title: 'canteen five',
        index:'five',
        width: '20%',
    },
    {
        url: null,
        title: 'canteen six',
        index:'six',
        width: '20%',
    },
];

class ButtonBases extends React.Component{
    constructor(props){
        super(props);
        this.state={
            load:false,
            img:null,
        }
    }

    componentDidMount(){

        fetch('http://localhost:8080/Img/Restaurant',{
            credentials: 'include',
            method:'GET',
            mode:'cors',
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                for (let i=0;i<6;i++){
                    images[i].url=result[i];
                }
                this.setState({
                    img:images,
                    load:true,
                });
            });
        });


    };
    render() {
        const {classes} = this.props;

        if (this.state.load) {
            return (
                <div>
                <div className={classes.title}>
                    <StoreIcon style={{float:'left',marginRight:5}}/><p >请选择餐厅</p>
                </div>
                <Divider/>
                <div className={classes.root}>
                    {this.state.img.map(image => (
                        <ButtonBase
                            focusRipple
                            key={image.title}
                            className={classes.image}
                            focusVisibleClassName={classes.focusVisible}
                            style={{
                                width: image.width,
                            }}
                        >
                            <span className={classes.imageSrc}
                                  style={{
                                       backgroundImage: `url(${image.url})`,
                                   }}
                            />
                            <span className={classes.imageBackdrop}/>
                            <span className={classes.imageButton}>
                                <Typography
                                    component="span"
                                    variant="subheading"
                                    color="inherit"
                                    className={classes.imageTitle}
                                >
                                  {image.title}
                                    <Link to={'/floor/' + image.index}><span className={classes.imageMarked}/></Link>
                                </Typography>
                            </span>
                        </ButtonBase>
                    ))}
                </div>
                </div>
            );
        }
        else{
            return (<p> </p>)
        }
    }
}

ButtonBases.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);