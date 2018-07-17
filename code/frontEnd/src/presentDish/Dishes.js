import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    card: {
        maxWidth: 1200,
        margin:20
    },
    cardHeader:{
        marginLeft:20,
        marginRight:20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
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
    avatar3: {
        color: red[500],
    },
    avatar2: {
        color: red[0],
    },
    avatar:{
        backgroundColor:'#fb8c00'
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class Dishes extends React.Component {
    state = {
        userId:-1,
        expanded: false,
        like:this.props.like,
        icon:1,
        picture:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4099675241,2760395260&fm=15&gp=0.jpg"
    };

    handleExpandClick = () => {
      //  alert(this.props.Tags);
        this.setState(state => ({
            expanded: !state.expanded
        }));
    };

    handleLikeClick=()=>{
        let formData=new FormData();
        formData.append("foodId",this.props.foodId);
        let userId=this.props.userId;
        if(userId==="-1"){
            alert("Please Login");
            return;
        }
        formData.append("userId",userId);
        formData.append("state",1);
        fetch('http://localhost:8080/UserLikeFood/Save', {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: formData,
        }).then(response => {
            console.log('Request successful', response);
            return response.json().then(result => {
                this.setState({
                    icon: result
                });
                if(result===0){
                    this.setState({
                        like:this.state.like+1
                    })
                }
                else{
                    this.setState({
                        like:this.state.like-1
                    })
                }
                })
        });
    };

  /*  componentWillMount(){
        let formData=new FormData();
        formData.append("foodId",this.props.foodId);
        let userId=this.props.userId;
        if(userId==="-1") {
            alert("-1");
        }
        else {
            alert(userId);
            formData.append("userId",userId);
            formData.append("state",0);
            fetch('http://localhost:8080/UserLikeFood/Save', {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: formData,
            }).then(response => {
                console.log('Request successful', response);
                return response.json().then(result => {
                    this.setState({
                        icon: result
                    });})
            });
        }
    }
*/
    componentWillReceiveProps(nextProps){
        let formData=new FormData();
        formData.append("foodId",this.props.foodId);
        let userId=this.props.userId;
        if(userId==="-1"|| userId===this.state.userId) {
        }
        else {
            //alert(userId+" "+this.props.foodId);
            formData.append("userId",userId);
            formData.append("state",0);
            fetch('http://localhost:8080/UserLikeFood/Save', {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: formData,
            }).then(response => {
                console.log('Request successful', response);
                return response.json().then(result => {
                    this.setState({
                        icon: result,
                        userId:this.props.userId,
                    });})
            });
        }
    }


    render() {
        const { classes } = this.props;

        return (
            <Grid>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>

                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={this.props.foodname}
                        subheader={this.props.window_name}
                        className={classes.cardHeader}
                    />
                    <CardMedia
                        className={classes.media}
                        image={this.state.picture}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography component="p">
                            Price:{this.props.price}￥
                        </Typography>

                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites" onClick={this.handleLikeClick}>
                            {this.state.icon?<FavoriteIcon className={classes.avatar2}/>:
                            <FavoriteIcon className={classes.avatar3}/>}
                        </IconButton>{this.state.like}
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton><i>{!this.state.icon?"已收藏":"加入收藏"}</i>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph variant="body2">
                                   Tips:
                                </Typography>
                                <Typography paragraph>
                                    {this.props.tips}
                                    {this.props.Tags.map(data => {
                                        let avatar = null;
                                        return (
                                            <Chip
                                                key={data.tagId}
                                                avatar={avatar}
                                                label={data.tagName}
                                                className={classes.chip}
                                            />
                                        );
                                    })}
                                </Typography>
                            </CardContent>
                        </Collapse>

                </Card>
                </Grid>

        );
    }
}

Dishes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dishes);