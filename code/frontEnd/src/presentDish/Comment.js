import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';

const styles = theme => ({
    root: {
        padding:10,
        width:'80%',
     //   maxWidth: '50%',
        height:'20%',
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,

    },

    root2: {
        padding:10,
        width: '50%',
        backgroundColor: theme.palette.background.paper,
    },
    row: {
        display: 'flex',
        margin:10,
        justifyContent: 'Left',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});


class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        userId:"-1",
        commentContent:"Nice",
    };

    handleDelete=(event, commentId)=>{
            let formData=new FormData();
            formData.append("commentId",commentId);
            fetch('http://localhost:8080/Comment/DeleteComment',{
                credentials: 'include',
                method:'POST',
                mode:'cors',
                body:formData,
            }).then(response=>{
                console.log('Request successful',response);
                
            });
    }


    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div>
                <div className={classes.root2}>

                    <Button variant="fab" color="secondary" aria-label="edit" className={classes.button}>
                        <ChatIcon/>
                    </Button>
                    <List>
                        {this.props.commentList.map((item,i) => (
                            <div>
                                <ListItem>
                                    <Avatar  src={item.HeadPic}/>
                                    <ListItemText primary={item.userName} secondary={item.commentDate.month+"-"+item.commentDate.date+" "+item.commentDate.hours+":"+ item.commentDate.minutes}/>
                                    <ListItemText>
                                    {this.props.userId===item.userId.toString()?
                                        <IconButton className={classes.button} aria-label="Delete" onClick={event=>this.props.handleDelete(event,item.commentId)}>
                                            <DeleteIcon />
                                        </IconButton>:<div/>
                                    }
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <Paper className={classes.root} elevation={1}>
                                        <div className={classes.root} >{item.commentContent.toString()}</div>
                                        <Typography component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica         Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica         Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                            {item.commentContent}
                                        </Typography>
                                    </Paper>
                                </ListItem>
                                <Divider/>
                            </div>
                        ))}
                    </List>
                </div>
            </div>

        );
    }
}
CommentList.propTypes = {
    classes: PropTypes.object.isRequired,

};
export default withStyles(styles)(CommentList);

