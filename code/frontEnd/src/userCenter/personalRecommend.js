import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RoomIcon from '@material-ui/icons/Room';
import {Col, Label, Row} from 'react-bootstrap';
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import red from "@material-ui/core/es/colors/red";
import Grid from "@material-ui/core/es/Grid/Grid";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import blue from "@material-ui/core/es/colors/blue";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from "@material-ui/core/es/Typography/Typography";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import classnames from 'classnames';
import Chip from "@material-ui/core/es/Chip/Chip";
import Button from "@material-ui/core/es/Button/Button";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import green from '@material-ui/core/colors/green';

import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import AutorenewIcon from '@material-ui/icons/Autorenew';


const theme2=createMuiTheme({
    typography:{
        fontSize:25,
    },
    palette: {
        primary: {
            light: '#039be5',
            main: '#63ccff',
            dark: '#006db3',
            contrastText: '#424242',
        },
        secondary: {
            light: '#fb8c00',
            main: '#ffbd45',
            dark: '#c25e00',
            contrastText: '#424242',
        },

    },
});
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 400,
        margin:20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    content1:{
        margin: theme.spacing.unit,
        marginLeft: 0.5 * theme.spacing.unit
    },
    content2:{
        margin: 0.5 * theme.spacing.unit,
        marginLeft: 2 * theme.spacing.unit
    },
    avatar: {
        color: red[500],
    },
    avatar2: {
        color: red[0],
    },
    avatar3: {
        color: blue[500],
    },
    likeButton: {
        zIndex: 100,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    chip: {
        margin: theme.spacing.unit,
    },
    chipDelete:{
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: theme.spacing.unit,
    },

    wrapper: {
        marginLeft:2*theme.spacing.unit,
        margin: theme.spacing.unit,
        position: 'relative',
    },
    fabProgress: {
        color: blue[500],
        marginLeft:2*theme.spacing.unit,
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    change:{
        marginLeft:2*theme.spacing.unit,
        margin: 2*theme.spacing.unit,
    }
});


class PersonalRecommend extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            like: [],
            foodInfo: [],
            imageUrl: [],
            expanded: false,
            tags:[],
            loading: false,
            success: false,
        };
        this.likeButton = this.likeButton.bind(this);
        this.searchUserTagRelatedFood = this.searchUserTagRelatedFood.bind(this);
        this.searchFoodPic = this.searchFoodPic.bind(this);
        this.handleExpandClick=this.handleExpandClick.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleNextClick=this.handleNextClick.bind(this);
    }
    timer = null;

    componentDidMount() {
        this.searchUserTagRelatedFood();
        clearTimeout(this.timer);
    }

    handleNextClick = () => {
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false,
                            success: true,
                        });
                    }, 1000);
                },
            );
        }
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    searchFoodPic = (name) => {
        console.log("name:" + name);
        fetch('http://localhost:8080/UserLikeFood/GetPic?foodID=' + name,
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response=> {
                let blob = response.blob();
                return blob
                    .then(blob => {
                        let reader = new FileReader();
                        reader.readAsDataURL(blob);
                        let temp = this.state.imageUrl;
                        reader.onloadend = ()=> {
                            temp[name] = reader.result;
                            this.setState({
                                imageUrl:temp
                            })
                        };
                    });
            });
    };

    likeButton = name => event => {
        let temp = this.state.like;
        temp[name] = !temp[name];
        this.setState({
            like: temp,
        });
        let flag = 1;
        if (temp[name] === false) {
            flag = 0;
        }
        fetch('http://localhost:8080/UserLikeFood/update?' +
            'userId='+this.props.userid+
            '&userLikeId=' + name +
            '&flag=' + flag,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        alert(result);
                    });
            })
    };

    searchUserTagRelatedFood=()=>{
        fetch('http://localhost:8080/UserTag/UserTagRelatedFood/search?' +
            'userId='+this.props.userid,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        let likeList = [];
                        let foodList=[];
                        for(let i=0;i<result.length;i++){
                            for(let j=i+1;j<result.length;j++){
                                if(result[i].relatedTags.length<result[j].relatedTags.length){
                                    let temp=result[j];
                                    result[j]=result[i];
                                    result[i]=temp;
                                }
                                if(result[i].relatedTags.length === result[j].relatedTags.length){
                                    if(result[i].viewHistory < result[j].viewHistory){
                                        let temp=result[j];
                                        result[j]=result[i];
                                        result[i]=temp;
                                    }
                                }
                            }
                        }
                        for(let i in result){
                            console.log("tagSize:"+result[i].like);
                            let add = {
                                "foodId": result[i].foodId,
                                "foodName": result[i].foodName,
                                "windowName": result[i].windowName,
                                "restaurant": result[i].restaurant,
                                "tags":result[i].tags,
                                "price":result[i].price,
                                "tips":result[i].tips,
                                "relatedTags":result[i].relatedTags
                            };
                            if(result[i].like===1){
                                likeList[result[i].foodId] = true;
                            }
                            else{
                                likeList[result[i].foodId] = false;
                            }

                            console.log("tags:"+result[i].tags);
                            foodList.push(add);
                            this.searchFoodPic(result[i].foodId);
                        }
                        this.setState({
                            foodInfo: foodList,
                            like: likeList,

                        })
                    });
            })
    };

    handleDelete= item => event => {
        let temp=this.state.foodInfo;
        for(let i=0;i<temp.length;i++){
            if(temp[i].foodId===item.foodId){
                temp.splice(i,1);
                break;
            }
        }
        this.setState({
            foodInfo:temp
        });
        let dislikeTags=[];
        for(let i=0;i<item.tags.length;i++){
            if((item.relatedTags.indexOf(item.tags[i]))===-1){
                dislikeTags.push(item.tags[i]);
            }
        }
        fetch('http://localhost:8080/UserTag/UpdateUserDislikeTag?' +
            'userId='+this.props.userid+
            '&dislikeTags=' + dislikeTags,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        alert(result);
                    });
            })
    };

    render() {
        const { classes } = this.props;
        const { loading, success } = this.state;

        return (
            <div>
                <MuiThemeProvider theme={theme2}>
                    <div className={classes.wrapper}>
                        <Row>
                            <Col sm={1}>
                                <Button
                                    variant="fab"
                                    color="primary"
                                    onClick={this.handleNextClick}
                                >
                                    {success ? <AutorenewIcon/> : <AutorenewIcon/>}
                                    </Button>
                                {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                            </Col>
                            <Col sm={0.1}>
                                <div className={classes.change}>{"换一批"}</div>
                            </Col>
                        </Row>
                    </div>

                <Grid container spacing = {24} >
                    <Grid item xs = {12}>
                        <Grid container className = {classes.demo} >{
                            this.state.foodInfo.map(function (item){
                                return <Grid item xs = {8} sm = {4}>
                                    <Card className={classes.card}>
                                        <Chip
                                            label="delete"
                                            onDelete={this.handleDelete(item)}
                                            className={classes.chipDelete}
                                        />
                                        <CardHeader
                                            avatar={
                                                <RoomIcon/>
                                            }
                                            title = {<div className = {classes.content1}>
                                                    {item.restaurant+', ' + item.windowName}
                                            </div>
                                            }
                                            action={
                                                <IconButton>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                        />
                                        <CardMedia
                                            className = {classes.media}
                                            image = {this.state.imageUrl[item.foodId]}
                                        />
                                        <CardContent>
                                            <Typography component="p">
                                                <div>{"Food Name："+item.foodName}</div>
                                                <div>{"Food Price(￥)："+item.price}</div>
                                                <div>{"Label："}
                                                {
                                                    item.tags.map(function (item){
                                                        return <Chip label={item} className={classes.chip} />
                                                    },this)
                                                }</div>
                                            </Typography>
                                        </CardContent>

                                        <CardActions className = {classes.actions}
                                                     disableActionSpacing>
                                            <IconButton className = {classes.likeButton}
                                                        onClick = {this.likeButton(item.foodId)}>
                                                {this.state.like[item.foodId]
                                                    ?<FavoriteIcon className = {classes.avatar}/>
                                                    :<FavoriteIcon className = {classes.avatar2}/>}
                                                    </IconButton>

                                            <IconButton>
                                                <ShareIcon />
                                            </IconButton>


                                            <IconButton
                                                className={classnames(classes.expand, {
                                                    [classes.expandOpen]: this.state.expanded,
                                                })}
                                                onClick={this.handleExpandClick}
                                                aria-expanded={this.state.expanded}
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>

                                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph variant="body2">
                                                    {"Tips： "+item.tips}
                                                </Typography>

                                            </CardContent>
                                        </Collapse>

                                    </Card>
                                </Grid>
                            },this)
                        }
                        </Grid>
                    </Grid>
                </Grid>
                </MuiThemeProvider>
            </div>
        );
    }
}

PersonalRecommend.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalRecommend);
