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

    handleJump = value => () =>{
        alert(value);
        this.setState({ open: false });
        this.props.close();
        window.location.href="/";
    };
    componentWillReceiveProps = nextProps =>{
        this.setState({open:nextProps.open,content:nextProps.content});
        if (nextProps.open === true){

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
                    <List>
                        {this.state.result.map((item,i) =>
                            (
                                <div>
                                    <ListItem key={item[0]} button onClick={this.handleJump(item[0])}>
                                        <ListItemText primary={item[0]} secondary={item[1]} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                    </List>
                </Dialog>
        );
    }
}

SearchRes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchRes);