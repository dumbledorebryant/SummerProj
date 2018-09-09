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
import pic from '../img/noPic.jpg'
import Typography from "@material-ui/core/es/Typography/Typography";
import Chip from "@material-ui/core/es/Chip/Chip";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GavelIcon from '@material-ui/icons/Gavel';
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import classnames from 'classnames';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import deepOrange from "@material-ui/core/es/colors/deepOrange";
import {Pagination} from "antd";


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
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
});

const info = [];
class PersonalCollection extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            like: [],
            likeFoodInfo: info,
            imageUrl: [],
            expanded: [],
            saleBool: [],
            current:1,
            pageNum:0,
            likeFoodInfoGroup:[]
        };
        this.likeButton = this.likeButton.bind(this);
        this.searchLike = this.searchLike.bind(this);
        this.searchLikePic = this.searchLikePic.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);

        this.handlePageSelect = this.handlePageSelect.bind(this);
    }

    componentWillMount(){
        this.searchLike();
    }
    handlePageSelect(eventKey) {
        this.setState({
            activePage: eventKey
        });
    }

    handleExpandClick = id => event => {
        let temp=this.state.expanded;
        temp[id]=!temp[id];
        this.setState({
            expanded:temp
        })
    };

    searchLikePic = (name) => {
        console.log("name:" + name);
        fetch('http://localhost:8080/UserLikeFood/GetPic?foodID=' + name,
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response=> {
                return response.json()
                    .then(result => {
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

    searchLike=()=>{
        fetch('http://localhost:8080/UserLikeFood/search?' +
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

                        let saleBoolTemp=[];
                        let foodListGroup=[];
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
                            let add = {
                                "foodId": result[i].foodId,
                                "foodName": result[i].foodName,
                                "price":result[i].price,
                                "tips":result[i].tips,
                                "tags":result[i].tags,
                                "windowName": result[i].windowName,
                                "restaurant": result[i].restaurant};
                            likeList[result[i].foodId] = true;
                            if(result[i].today===1){
                                saleBoolTemp[result[i].foodId]=true;
                            }
                            else{
                                saleBoolTemp[result[i].foodId]=false;
                            }
                            this.searchLikePic(result[i].foodId);
                            let idx = i % groupNum;
                            foodListGroup[idx].push(add);
                        }
                        this.setState({
                            saleBool:saleBoolTemp,
                            likeFoodInfo: foodListGroup.length>0?foodListGroup[0]:[],
                            like: likeList,
                            pageNum:groupNum,
                            likeFoodInfoGroup:foodListGroup
                        })
                    });
            })
    };

    onPageChange = (page) => {
        let temp=this.state.likeFoodInfoGroup[page-1];
        this.setState({
            current: page,
            likeFoodInfo:temp
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <MuiThemeProvider theme={theme2}>
                <Grid container spacing = {24} >
                    <Grid item xs = {12}>
                        <Grid container className = {classes.demo} >{
                             this.state.likeFoodInfo.map(function (item){
                            return <Grid item xs = {8} sm = {4}>
                                <Card className={classes.card}>
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
                                            {this.state.saleBool[item.foodId]
                                                ?<div><GavelIcon/> On Sale Today</div>
                                                :<div>{}</div>}
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
                        },this)
                        }
                        </Grid>
                    </Grid>
                </Grid>
                </MuiThemeProvider>
                <div align ="center">
                    <Pagination current={this.state.current}
                                onChange={this.onPageChange}
                                total={this.state.pageNum*10}/>
                </div>
                <br/><br/>
            </div>
        );
    }
}

PersonalCollection.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalCollection);
