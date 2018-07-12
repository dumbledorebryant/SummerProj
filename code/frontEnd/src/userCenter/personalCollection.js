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
import {Col, Row} from 'react-bootstrap';
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import red from "@material-ui/core/es/colors/red";
import Grid from "@material-ui/core/es/Grid/Grid";

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
    }
});

const info = [];
const foodIDList = [];
class PersonalCollection extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            like: [],
            likeFoodInfo: info,
            imageUrl: []
        };
        this.likeButton = this.likeButton.bind(this);
        this.searchLike = this.searchLike.bind(this);
        this.searchLikePic = this.searchLikePic.bind(this);
        this.searchLike();
    }

    searchLikePic = (name) => {
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
                        console.log("result:" + result);
                        let likeList = [];
                        for(let i in result){
                            let add = {
                                "foodId": result[i].foodId,
                                "foodName": result[i].foodName,
                                "windowName": result[i].windowName,
                                "restaurant": result[i].restaurant};
                            info.push(add);
                            likeList[result[i].foodId] = true;
                            foodIDList.push(result[i].foodId);
                            this.searchLikePic(result[i].foodId);
                        }
                        this.setState({
                            likeFoodInfo: info,
                            like: likeList
                        })
                    });
            })
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container spacing = {24} >
                    <Grid item xs = {12}>
                        <Grid container className = {classes.demo} >{
                        this.state.likeFoodInfo.map(function (item){
                            return <Grid item xs = {8} sm = {4}>
                                <Card className={classes.card}>
                                <CardHeader
                                    avatar = {
                                        <RoomIcon/>
                                    }
                                    title = {
                                        <h4 className = {classes.content1}>
                                        {item.restaurant+', ' + item.windowName}
                                        </h4>
                                    }
                                />
                                <CardMedia
                                    className = {classes.media}
                                    image = {this.state.imageUrl[item.foodId]}
                                    title = "Contemplative Reptile"
                                />
                                <Row>
                                    <Col md = {1}>
                                        <CardActions className = {classes.actions}
                                                     disableActionSpacing>
                                            <IconButton className = {classes.likeButton}
                                                        aria-label = "Add to favorites"
                                                        onClick = {this.likeButton(item.foodId)}>
                                                {this.state.like[item.foodId]
                                                    ?<FavoriteIcon className = {classes.avatar}/>
                                                    :<FavoriteIcon className = {classes.avatar2}/>}
                                            </IconButton>
                                        </CardActions>
                                    </Col>
                                    <Col md = {9}>
                                        <CardContent className = {classes.content2}>
                                            {<h4>{item.foodName}</h4>}
                                        </CardContent>
                                    </Col>
                                </Row>
                            </Card>
                            </Grid>
                        },this)
                    }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

PersonalCollection.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalCollection);
