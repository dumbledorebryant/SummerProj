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
import ReactQuill from 'react-quill'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        width: '100%',
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
    editor:{

    }
});


class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        userId:"-1",
        commentContent:null,
        editorPop:false,
        windowId:this.props.windowId,
        login:false,
        show:false,
        commentList:this.props.commentList,
    };

    toolbarOptions=[
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image'],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
        ];

    componentWillMount(){
        fetch('http://localhost:8080/User/State',{
            credentials: 'include',
            method:'GET',
            mode:'cors',
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                if (result[0]!=="-1" ){
                    this.setState({login:true,userId:result[0]});
                }
            });
        });
    }

    componentWillReceiveProps = (nextProps) =>{
        this.setState({windowId:nextProps.windowId,commentList:nextProps.commentList});
    };

    handleChangeEditor =(value)=>{
        this.setState({commentContent:value});
    };

    handleDelete = commentId=>()=>{
        let formData=new FormData();
        formData.append("commentId",commentId);
        formData.append("windowId",this.state.windowId);
        fetch('http://localhost:8080/Comment/DeleteComment',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({
                    commentList:result,
                });
            })
        });
    };


    handleSubmitEditor = () =>{
        let formData = new FormData();
        formData.append("windowId",this.props.windowId);
        formData.append("commentContent",this.state.commentContent);
        fetch('http://localhost:8080/Comment/Save',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({commentList:result});
            });
        });
        this.setState({
            editorPop:false,
            commentContent:null
        });
    };


    handleEditorClose = () =>{
       this.setState({editorPop:false});
    };

    handleEditorOpen = () =>{
        this.setState({editorPop:true});
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div className={classes.root2}>
                {this.state.windowId !== 0 && this.state.login &&
                <Button variant="fab" color="secondary" aria-label="edit" className={classes.button}
                        onClick={this.handleEditorOpen}>
                    <ChatIcon/>
                </Button>}
                <List id="comments" style={{display: "block"}}>
                    {this.state.commentList.map((item, i) => (
                        <div>
                            <ListItem>
                                <Avatar src={item.HeadPic}/>
                                <ListItemText primary={item.userName}
                                              secondary={item.commentDate.month + "-" + item.commentDate.date + " " + item.commentDate.hours + ":" + item.commentDate.minutes}/>
                                <ListItemText>
                                    {this.state.userId === item.userId.toString() ?
                                        <IconButton className={classes.button} aria-label="Delete"
                                                    onClick={this.handleDelete(item.commentId)}>
                                            <DeleteIcon/>
                                        </IconButton> : <div/>
                                    }
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Paper className={classes.root} elevation={1}>
                                    <Typography id={"comment" + this.state.windowId + item.commentId}
                                                className={classes.root}><p dangerouslySetInnerHTML={{__html: item.commentContent}}/></Typography>
                                </Paper>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))}
                </List>
                <Dialog
                    open={this.state.editorPop}
                    onClose={this.handleEditorClose}
                    aria-labelledby="form-dialog-title"
                    className={classes.editor}
                >
                    <DialogTitle id="form-dialog-title">Create Comment</DialogTitle>
                    <DialogContent>
                        <ReactQuill modules={{toolbar: this.toolbarOptions}} style={{height: "200px"}}
                                    value={this.state.commentContent}
                                    onChange={this.handleChangeEditor}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleEditorClose}>cancel</Button>
                        <Button onClick={this.handleSubmitEditor}>submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
            )
    }
}
CommentList.propTypes = {
    classes: PropTypes.object.isRequired,

};
export default withStyles(styles)(CommentList);

