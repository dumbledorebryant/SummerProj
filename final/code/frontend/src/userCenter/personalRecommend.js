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
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ChildCareIcon from '@material-ui/icons/ChildCare';
import pic from '../img/noPic.jpg'

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
    header:{
        width: '100%',
        maxWidth: 360,
    },
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
        left: -20,
        zIndex: 1,
    },
    change:{
        marginLeft:2*theme.spacing.unit,
        margin: 2*theme.spacing.unit,
    }
});

const foodListGroup=[];
class PersonalRecommend extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            like: [],
            foodInfo: [],
            foodListGroupIdx:0,
            imageUrl: [],
            expanded: [],
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
        let idx=this.state.foodListGroupIdx;
        idx++;
        if(idx===foodListGroup.length){
            idx=0;
        }
        let temp=null;
        if (foodListGroup.length===0) temp=[];
        else temp = foodListGroup[idx];
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                    foodListGroupIdx:idx,
                    foodInfo:temp,
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false,
                            success: true,
                        });
                    }, 500);
                },
            );

        }
    };

    handleExpandClick = id => event => {
        let temp=this.state.expanded;
        temp[id]=!temp[id];
        this.setState({
            expanded:temp
        })
    };

    searchFoodPic = (name) => {
        console.log("name:" + name);
        fetch('http://localhost:8080/UserLikeFood/GetPic?' +
            'foodID=' + name,
            {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response=> {
                return response.json()
                    .then(result => {
                        // let temp = this.state.imageUrl;
                        // if(blob.size === 0){
                        //     temp[name]='';
                        //     this.setState({
                        //         imageUrl:temp
                        //     });
                        //     return;
                        // }
                        // let reader = new FileReader();
                        // reader.readAsDataURL(blob);
                        // reader.onloadend = ()=> {
                        //     temp[name] = reader.result;
                        //     this.setState({
                        //         imageUrl:temp
                        //     })
                        // };
                        let temp = this.state.imageUrl;
                        temp[name] = result[0];
                        this.setState({imageUrl:temp})
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
                credentials: 'include',
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
            'userId='+this.props.userid ,
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        console.log("UserTagRelatedFood"+result);
                        if(result.length===0){
                            return;
                        }
                        let likeList = [];
                        let foodList=[];
                        let expandedList=[];
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

                        let groupNum=0;
                        if(result.length % 3 === 0){
                            groupNum=result.length/3;
                        }
                        else {
                            groupNum = (parseInt(result.length/3) + 1);
                        }

                        for(let k = 0;k < groupNum;k++) {
                            foodListGroup[k] = [];
                        }
                        for(let i in result){
                            expandedList[result[i].foodId]=false;
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
                            else {
                                likeList[result[i].foodId] = false;
                            }
                            foodList.push(add);
                            let idx = i % groupNum;
                            foodListGroup[idx].push(add);
                            this.searchFoodPic(result[i].foodId);
                        }
                        this.setState({
                            foodInfo: foodListGroup.length>0?foodListGroup[0]:[],
                            like: likeList,
                            expanded: expandedList
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
            '&dislikeTags=' + dislikeTags,
            {
                credentials: 'include',
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
                <div className={classes.header}>
                    <List>
                        <ListItem>
                            <Avatar>
                                <ChildCareIcon />
                            </Avatar>
                            <ListItemText primary="猜您喜欢"  />
                        </ListItem>
                    </List>
                </div>
                <MuiThemeProvider theme={theme2}>
                    <div className={classes.wrapper}>
                        <IconButton className={classes.likeButton}
                                    onClick={this.handleNextClick}>
                            {success ? <AutorenewIcon /> : <AutorenewIcon />}
                            </IconButton>
                        {loading && <CircularProgress size={60} className={classes.fabProgress}/>}
                        {"换一批"}
                    </div>

                <Grid container spacing = {24} >
                    <Grid item xs = {12}>
                        <Grid container className = {classes.demo} >
                            {this.state.foodInfo.length>0 && this.state.foodInfo.map(function (item){
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
                                            image = {this.state.imageUrl[item.foodId]
                                                ? this.state.imageUrl[item.foodId]
                                                : pic}

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
                                                    [classes.expandOpen]: this.state.expanded[item.foodId],
                                                })}
                                                onClick={this.handleExpandClick(item.foodId)}
                                                aria-expanded={this.state.expanded[item.foodId]}
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>

                                        <Collapse in={this.state.expanded[item.foodId]} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph variant="body2">
                                                    {"Tips： "+item.tips}
                                                </Typography>

                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </Grid>
                            },this)}
                        {this.state.foodInfo.length === 0 && <p style={{marginLeft:30}}>nothing to recommend</p>}

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
