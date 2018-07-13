import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SearchResult from './searchResult'
const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SearchRes extends React.Component {
    constructor(props){
        super(props);
    };

    state = {
        open: this.props.open,
        content:this.props.content,
        result:[]
    };


    handleClose = () => {
        this.setState({ open: false });
        this.props.close();
    };

    handleJump =  () =>{
        this.setState({ open: false });
        this.props.close();
    };


    componentWillReceiveProps = nextProps =>{
        this.setState({open:nextProps.open,content:nextProps.content});
        if (nextProps.open === true){
            let formData=new FormData();
            formData.append("content",nextProps.content);
            let time=new Date().getHours();
            if (time >= 6 && time <11){
                formData.append("time","1");
            }
            else if (time >=11 && time <17){
                formData.append("time","2");
            }
            else if (time >=17 && time <22){
                formData.append("time","3");
            }
            fetch('http://localhost:8080/Search/All',{
                credentials: 'include',
                method:'POST',
                mode:'cors',
                body:formData,

            }).then(response=>{
                console.log('Request successful',response);
                return response.json().then(result=>{
                    this.setState({result:result});
                });
            });
        }
    };
    render() {
        const { classes } = this.props;
        return (
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Search:  {this.state.content}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {this.state.result.length > 0?<List>
                        {this.state.result.map((item,i) =>
                            (
                                <div>
                                    <ListItem key={item.foodName+item.tag}>
                                        <ListItemText primary={item.foodName}/>
                                    </ListItem>
                                    <SearchResult key={item.foodName+item.tag} rid={item.foodName+item.tag}
                                                  restaurant={item.restaurant} windowName={item.windowName}
                                                  windowId={item.windowId} foodName={item.foodName} likes={item.likes}
                                                  price={item.price} tips={item.tips} tag={item.tag} content={this.state.content}
                                                  close={this.handleJump}
                                    />

                                    <Divider />
                                </div>
                            ))}
                    </List>:<p style={{margin:50}}>no result</p>}
                </Dialog>
        );
    }
}

SearchRes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchRes);