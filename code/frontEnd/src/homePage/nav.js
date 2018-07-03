
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mailFolderListItems, otherMailFolderListItems } from './navdata';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import MainPage from './mainPage'

import AccountCircle from '@material-ui/icons/AccountCircle';
const drawerWidth = 240;

function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const theme2 = createMuiTheme({
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
    typography: {
        // Tell Material-UI what the font-size on the html element is.
        fontSize: 14,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
   });

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    flex: {
        flex: 1,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    loginTab:{
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,

    },
    paper:{
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        paddingLeft: theme.spacing.unit * 4,
    },
    paper2:{
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        backgroundColor:'#FAFAFA'
    },
    paper3:{
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        paddingLeft: theme.spacing.unit * 4,
        marginTop:30
    },
    registerTitle:{
        backgroundColor:'#039be5',
        marginBottom:20,
    }
});

class MiniDrawer extends React.Component {
    state = {
        open: false, //drawer
        registerPop:false, //register
        registerPattern:0,
        nameR:"",
        pwdR:"",
        pwdReR:"",
        emailR:"",
        phoneR:"",
        nameRok:true,
        pwdRok:true,
        pwdReRok:true,
        emailRok:true,
        phoneRok:true,
        loginPop:false,  //login
        value:0,  //logintabs
        loginPattern:0,
        login:false,
        logoutPop:false, //logout
    };

    //nav
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    //login
    handleLoginOpen = () =>{
        this.setState({ loginPop:true});
    };

    handleLoginClose = () =>{
        this.setState({ loginPop:false});
    };

    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    handleLogin = () =>{
        let un=document.getElementById("username-input");
        let pwd=document.getElementById("password-input");
        let info={role:this.state.value,username:un,password:pwd};
        alert(this.state.value+"\n"+un.value+"\n"+pwd.value);
        this.setState({login:true,loginPattern:1});
        //this.setState({loginPattern:2});
    };

    handleLoginFail = () =>{
        this.setState({loginPattern:0});
    };

    handleLoginSuccess = () =>{
      this.setState({loginPop:false,loginPattern:0});
    };
    //register

    handleRegisterOpen = () =>{
        this.setState({ registerPop:true});
    };

    handleRegisterClose = () =>{
        this.setState({ registerPop:false,
            nameR:"",
            pwdR:"",
            pwdReR:"",
            emailR:"",
            phoneR:"",
            nameRok:true,
            pwdRok:true,
            pwdReRok:true,
            emailRok:true,
            phoneRok:true});
    };

    handleRegister = () => {
        let info = {username:this.state.nameR,
                    password:this.state.pwdR,
                    email:this.state.emailR,
                    phone:this.state.phoneR};
        alert(this.state.nameR+"\n"+this.state.pwdR+"\n"+this.state.emailR+"\n"+this.state.phoneR);
    };

    handleChangeName = event => {
        if (event.target.value.length > 12){
            this.setState({nameRok:false,nameR:event.target.value});
        }
        else{
            this.setState({nameRok:true,nameR:event.target.value});
        }
    };

    handleChangePwd = event => {
        let password=event.target.value;
        let p1=/[0-9]/;
        let p2=/[a-zA-Z]/i;
        if (password.length >=6 && p1.test(password) && p2.test(password) ){
            this.setState({pwdRok:true,pwdR:event.target.value});
        }
        else{
            this.setState({pwdRok:false,pwdR:event.target.value});
        }
    };

    handleChangePwdRe = event => {
        if (event.target.value !== this.state.pwdR){
            this.setState({pwdReRok:false,pwdReR:event.target.value});
        }
        else{
            this.setState({pwdReRok:true,pwdReR:event.target.value});
        }
    };

    handleChangeEmail = event => {
        let email=event.target.value;
        if (email.indexOf("@") !== -1 && (email.indexOf(".com") !== -1 || email.indexOf(".cn") !== -1)){
            this.setState({emailRok:true,emailR:email});
        }
        else{
            this.setState({emailRok:false,emailR:email});
        }
    };

    handleChangePhone = event => {
        if (event.target.value.length === 11){
            this.setState({phoneRok:true,phoneR:event.target.value});
        }
        else{
            this.setState({phoneRok:false,phoneR:event.target.value});
        }
    };

    //logout

    handleLogoutOpen = () => {
        this.setState({logoutPop:true});
    };

    handleLogoutClose = () => {
        this.setState({logoutPop:false});
    };

    handleLogout = () =>{
        this.setState({login:false,logoutPop:false});
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <MuiThemeProvider theme={theme2}>
            <div className={classes.root}>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Eat Or Not
                        </Typography>
                        {!this.state.login?<Button color="inherit" onClick={this.handleLoginOpen}>Login</Button>:
                            <Button color="inherit" onClick={this.handleLogoutOpen}>Logout</Button>}
                        {!this.state.login?<Button color="inherit" onClick={this.handleRegisterOpen}>Register</Button>:
                            <IconButton
                                onclick={this.handleUserCenterOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>}
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mailFolderListItems}</List>
                    <Divider />
                    <List>{otherMailFolderListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <MainPage/>
                </main>

                <Dialog
                    open={this.state.loginPop}
                    onClose={this.handleLoginClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        {this.state.loginPattern===0 && <div className={classes.loginTab}>
                            <AppBar position="static">
                                <Tabs value={this.state.value} onChange={this.handleChangeTabs}>
                                    <Tab label="User"/>
                                    <Tab label="Admin"/>
                                    <Tab label="canteen worker"/>
                                </Tabs>
                            </AppBar>
                            {this.state.value === 0 && <TabContainer>
                                <Fade in={this.state.value === 0}>
                                    <Paper className={classes.paper} elevation={1}>
                                        <TextField
                                            id="username-input"
                                            label="Name"
                                            className={classes.textField}
                                            autoComplete="current-username"
                                            margin="normal"/>
                                        <TextField
                                            id="password-input"
                                            label="Password"
                                            className={classes.textField}
                                            type="password"
                                            autoComplete="current-password"
                                            margin="normal"/>
                                    </Paper>
                                </Fade>
                            </TabContainer>}
                            {this.state.value === 1 && <TabContainer>
                                <Fade in={this.state.value === 1}>
                                    <Paper className={classes.paper} elevation={1}>
                                        <TextField
                                            id="username-input"
                                            label="Name"
                                            className={classes.textField}
                                            autoComplete="current-username"
                                            margin="normal"/>
                                        <TextField
                                            id="password-input"
                                            label="Password"
                                            className={classes.textField}
                                            type="password"
                                            autoComplete="current-password"
                                            margin="normal"/>
                                    </Paper>
                                </Fade>
                            </TabContainer>}
                            {this.state.value === 2 && <TabContainer>
                                <Fade in={this.state.value === 2}>
                                    <Paper className={classes.paper} elevation={1}>
                                        <TextField
                                            id="username-input"
                                            label="Name"
                                            className={classes.textField}
                                            autoComplete="current-username"
                                            margin="normal"/>
                                        <TextField
                                            id="password-input"
                                            label="Password"
                                            className={classes.textField}
                                            type="password"
                                            autoComplete="current-password"
                                            margin="normal"/>
                                    </Paper>
                                </Fade>
                            </TabContainer>}
                        </div>}
                        {this.state.loginPattern===1 &&
                                <Typography component="p">
                                    login success.
                                </Typography>
                           }
                        {this.state.loginPattern===2 &&
                            <Typography component="p">
                                login fail.
                            </Typography>
                        }
                    </DialogContent>
                    {this.state.loginPattern===0 &&
                        <DialogActions>
                                <Button onClick={this.handleLoginClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleLogin} color="primary">
                                    Login
                                </Button>
                        </DialogActions>
                    }
                    {this.state.loginPattern===1 &&
                        <DialogActions>
                            <Button onClick={this.handleLoginSuccess} color="primary"> OK</Button>
                        </DialogActions>
                    }
                    {this.state.loginPattern===2 &&
                        <DialogActions>
                            <Button onClick={this.handleLoginClose} color="secondary"> Cancel </Button>
                            <Button onClick={this.handleLoginFail} color="primary"> Try again</Button>
                        </DialogActions>
                    }
                </Dialog>
                <Dialog
                    open={this.state.registerPop}
                    onClose={this.handleRegisterClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle className={classes.registerTitle} id="form-dialog-title">Register</DialogTitle>
                    <DialogContent>
                        <Paper className={classes.paper3} elevation={1}>
                        {this.state.nameRok?
                            <TextField
                                id="username-inputr"
                                label="Name"
                                className={classes.textField}
                                onChange={this.handleChangeName}
                                autoComplete="current-username"
                                margin="normal"
                                value={this.state.nameR}/>:
                            <TextField
                                error
                                id="username-inputr"
                                label="Name"
                                helperText="no more than 12 chars"
                                className={classes.textField}
                                onChange={this.handleChangeName}
                                autoComplete="current-username"
                                margin="normal"
                                value={this.state.nameR}/>}
                        {this.state.pwdRok?
                            <TextField
                                id="password-inputr"
                                label="Password"
                                className={classes.textField}
                                onChange={this.handleChangePwd}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                value={this.state.pwdR}/>:
                            <TextField
                                error
                                id="password-inputr"
                                label="Password"
                                helperText="more than 5 chars and use both letter and number"
                                className={classes.textField}
                                onChange={this.handleChangePwd}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                value={this.state.pwdR}/>}
                        {this.state.pwdReRok?
                            <TextField
                                id="passwordRe-inputr"
                                label="Repeat Password"
                                className={classes.textField}
                                onChange={this.handleChangePwdRe}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                value={this.state.pwdReR}/>:
                            <TextField
                                error
                                id="passwordRe-inputr"
                                label="Repeat Password"
                                helperText="to be same as the former one"
                                className={classes.textField}
                                onChange={this.handleChangePwdRe}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                value={this.state.pwdReR}/>}
                        {this.state.emailRok?
                            <TextField
                                id="email-inputr"
                                label="Email"
                                className={classes.textField}
                                onChange={this.handleChangeEmail}
                                autoComplete="current-email"
                                margin="normal"
                                value={this.state.emailR}/>:
                            <TextField
                                error
                                id="email-inputr"
                                label="Email"
                                helperText="invalid email format"
                                className={classes.textField}
                                onChange={this.handleChangeEmail}
                                autoComplete="current-email"
                                margin="normal"
                                value={this.state.emailR}/>}
                        {this.state.phoneRok?
                            <TextField
                                id="phone-inputr"
                                label="Phone"
                                className={classes.textField}
                                onChange={this.handleChangePhone}
                                autoComplete="current-phone"
                                margin="normal"
                                value={this.state.phoneR}/>:
                            <TextField
                                error
                                id="phone-inputr"
                                label="Phone"
                                helperText="11 numbers"
                                className={classes.textField}
                                onChange={this.handleChangePhone}
                                autoComplete="current-phone"
                                margin="normal"
                                value={this.state.phoneR}/>}
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRegisterClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleRegister} color="primary">
                            Register
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.logoutPop}
                    onClose={this.handleLogoutClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle className={classes.registerTitle} id="form-dialog-title">Logout</DialogTitle>
                    <DialogContent>
                        <Typography component="p">
                            Are you sure to log out?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleLogoutClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleLogout} color="primary">
                            Logout
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            </MuiThemeProvider>
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);