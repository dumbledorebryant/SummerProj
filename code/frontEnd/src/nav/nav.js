
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {  Link,Switch, Route, Redirect } from 'react-router-dom'
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
import { canteenListItems,otherListItems } from './navdata';
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
import Footer from './footer'
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search'
import Accessibility from'@material-ui/icons/Accessibility';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRes from './search'
import MailIcon from '@material-ui/icons/Mail';
import Snackbar from '@material-ui/core/Snackbar';
import TipsToTagSetting from '../userCenter/tipsToTagSetting'
import ChildCareIcon from '@material-ui/icons/ChildCare';
import PersonalRecommend from '../userCenter/personalRecommend'
import {theme2,primaryColor,secondaryColor,fontColor} from '../style/style'
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
        height:'100%'
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
        backgroundColor:primaryColor,
        marginBottom:20,
    },
    link:{
        fontcolor:fontColor,
    },
    search: {
        margin: theme.spacing.unit,
        borderRadius: 3
    },

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
        nameRok:false,
        pwdRok:false,
        pwdReRok:false,
        emailRok:false,
        phoneRok:false,
        loginPop:false,  //login
        value:0,  //logintabs
        loginPattern:0,
        login:false,
        admin:false,
        worker:false,
        logoutPop:false, //logout
        openSearch:false,  //search
        searchContent:"",
        openSetTagHint:false,  //settag
        openSetTag:false,
        openRecommendHint:false, //recommend
        openRecommend:false,
        system:null,   //pc system
    };

    //nav
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    //login
    loginName=null;
    loginId=null;
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
        let formData=new FormData();
        //formData.append("role",this.state.value.toString());
        if (this.state.value===0){
            formData.append("username",un.value);
            formData.append("password",pwd.value);
            fetch('http://localhost:8080/User/Login',{
                credentials: 'include',
                method:'POST',
                mode:'cors',
                body:formData,

            }).then(response=>{
                console.log('Request successful',response);
                return response.json()
                    .then(result=>{
                    if (result[0]==="0"){
                        this.setState({loginPattern:2})
                    }
                    else if (result[0]==="-1"){
                        this.setState({loginPattern:3})
                    }
                    else if (result[0]==="-2"){
                        this.setState({loginPattern:4})
                    }
                    else{
                        this.loginName=result[1];
                        this.loginId=result[0];
                        this.setState({login:true,loginPattern:1});
                    }
                });
            });
        }
        else if (this.state.value===1){
            formData.append("id",un.value);
            formData.append("password",pwd.value);
            fetch('http://localhost:8080/Admin/Login',{
                credentials: 'include',
                method:'POST',
                mode:'cors',
                body:formData,

            }).then(response=>{
                console.log('Request successful',response);
                return response.text().then(result=>{
                    if (this.state.system === "mac" && result==="fail\n"){
                        this.setState({loginPattern:2})
                    }
                    else if (this.state.system === "windows" && result === "fail\r\n"){
                        this.setState({loginPattern:2})
                    }
                    else{
                        this.loginName=result;
                        this.loginId=null;
                        this.setState({login:true,loginPattern:1,admin:true});
                    }
                });
            });
        }
        else{
            formData.append("id",un.value);
            formData.append("password",pwd.value);
            fetch('http://localhost:8080/Worker/Login',{
                credentials: 'include',
                method:'POST',
                mode:'cors',
                body:formData,

            }).then(response=>{
                console.log('Request successful',response);
                return response.text().then(result=>{
                    if (this.state.system === "mac" && result==="fail\n"){
                        this.setState({loginPattern:2})
                    }
                    else if (this.state.system === "windows" && result==="fail\r\n"){
                        this.setState({loginPattern:2})
                    }
                    else{
                        this.loginName=result;
                        this.loginId=null;
                        this.setState({login:true,loginPattern:1,worker:true});
                    }
                });
            });
        }
        //alert(this.state.value+"\n"+un.value+"\n"+pwd.value);
        //this.setState({login:true,loginPattern:1});
        //this.setState({loginPattern:2});
    };

    handleLoginFail = () =>{
        this.setState({loginPattern:0});
    };

    handleLoginSuccess = () =>{
      this.setState({loginPop:false,loginPattern:0});
      window.location.reload();
    };

    //register

    registerId=null;
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

    handleRegisterFail = () =>{
        this.setState({registerPattern:0});
    };

    handleRegisterSuccess = () =>{
        this.setState({registerPop:false,registerPattern:0,nameR:"",
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

        let formData=new FormData();
        formData.append("username",this.state.nameR);
        formData.append("password",this.state.pwdR);
        formData.append("email",this.state.emailR);
        formData.append("phone",this.state.phoneR);
        fetch('http://localhost:8080/User/Register',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,

        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                if (result[0]==="0"){
                    this.setState({registerPattern:2});
                }
                else if (result[0]==="-1"){
                    this.setState({registerPattern:3});
                }
                else{
                    this.registerId=result[0];
                    this.setState({registerPattern:1})
                }
            })
        });
        //alert(this.state.nameR+"\n"+this.state.pwdR+"\n"+this.state.emailR+"\n"+this.state.phoneR);
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
        if (this.state.admin){
            fetch('http://localhost:8080/Admin/Logout', {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',

            }).then(response => {
                console.log('Request successful', response);
            });
        }
        else if (this.state.worker){
            fetch('http://localhost:8080/Worker/Logout', {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',

            }).then(response => {
                console.log('Request successful', response);
            });
        }
        else {
            fetch('http://localhost:8080/User/Logout', {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',

            }).then(response => {
                console.log('Request successful', response);
            });
        }
        window.location.href="/";
        this.setState({login:false,logoutPop:false,admin:false,worker:false});
    };

    //search
    onFocusSearch = event =>{
        event.target.style.boxShadow="0px -2px 0px #899d73 inset";
    };

    onBlurSearch = event =>{
        event.target.style.boxShadow=null;
    };

    onHandleSearch = event =>{
        let input=document.getElementById("search");
        //alert(input.value);
        if (input.value!=="") this.setState({openSearch:true,searchContent:input.value});
    };

    onCloseSearch = () =>{
        let input=document.getElementById("search");
        input.value=null;
        this.setState({openSearch:false,searchContent:""});
    };

    //set tag
    handleCloseSetTagHint = () =>{
      this.setState({openSetTagHint:false});
    };

    openSetTag = () =>{
        this.setState({openSetTag:true,openSetTagHint:false});
    };

    handleCloseSetTag = () =>{
        this.setState({openSetTag:false})
    };

    //recommend
    handleCloseRecommendHint = () =>{
        this.setState({openRecommendHint:false})
    };

    handleCloseSetTagAndOpen=()=>{
        this.setState({
            openSetTag:false,
            openRecommendHint:true
        })
    };

    handleOpenRecommend = () =>{
        this.setState({openRecommendHint:false,openRecommend:true});
    };

    handleCloseRecommend = () =>{
        this.setState({openRecommend:false});
    };

    isMac = () =>{ return /macintosh|mac os x/i.test(navigator.userAgent); };
    isWindows = ()=> { return /windows|win32/i.test(navigator.userAgent); };

    componentWillMount(){
        if (this.isMac()) this.setState({system:"mac"});
        if (this.isWindows()) this.setState({system:"windows"});
        fetch('http://localhost:8080/User/State',{
            credentials: 'include',
            method:'GET',
            mode:'cors',

        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                if (result[0]!=="-1" ){
                    this.loginId=result[0];
                    this.loginName=result[1];
                    this.setState({login:true});
                    let formdata=new FormData();
                    formdata.append("userID",result[0]);
                    fetch('http://localhost:8080/UserTag/SearchSavedTag',{
                        credentials: 'include',
                        method:'POST',
                        mode:'cors',
                        body:formdata
                    }).then(response=>{
                        console.log('Request successful',response);
                        return response.json().then(result=>{
                            if (result.length===0){
                                this.setState({openSetTagHint:true});
                            }
                            else {
                                this.setState({openRecommendHint:true});
                            }
                        });
                    });
                }
            });
        });
        fetch('http://localhost:8080/Worker/State',{
            credentials: 'include',
            method:'GET',
            mode:'cors',

        }).then(response=>{
            console.log('Request successful',response);
            return response.text().then(result=>{
                if (this.state.system === "mac" && result!=="-1\n" ){
                    this.setState({login:true,worker:true});
                }
                else if (this.state.system === "windows" && result!=="-1\r\n" ){
                    this.setState({login:true,worker:true});
                }
            });
        });
        fetch('http://localhost:8080/Admin/State',{
            credentials: 'include',
            method:'GET',
            mode:'cors',

        }).then(response=>{
            console.log('Request successful',response);
            return response.text().then(result=>{
                if (this.state.system === "mac" && result!=="-1\n" ){
                    this.setState({login:true,admin:true});
                }
                else if (this.state.system === "windows" && result!=="-1\r\n" ){
                    this.setState({login:true,admin:true});
                }
            });
        });
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <MuiThemeProvider theme={theme2}>
            <div className={classes.root}>
                <AppBar
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
                        <TextField
                            className={classes.search}
                            id="search"
                            style={{backgroundColor:'#d0e7b7' ,paddingLeft:5 }}
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: (
                                    <InputAdornment  position="start">
                                        <SearchIcon id="searchBtn" onClick={this.onHandleSearch}/>
                                    </InputAdornment>
                                ),
                            }}
                            onFocus={this.onFocusSearch}
                            onBlur={this.onBlurSearch}
                        />
                        {!this.state.login?<Button color="inherit"
                                                   onClick={this.handleLoginOpen}>Login</Button>:
                            <Button color="inherit" onClick={this.handleLogoutOpen}>Logout</Button>}
                        {!this.state.login && <Button color="inherit" onClick={this.handleRegisterOpen}>Register</Button>}
                        {this.state.login && !this.state.admin&&!this.state.worker&&<Link className={classes.link} to={'/usercenter/'+this.loginId}><IconButton
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton></Link>}
                        {this.state.login && this.state.admin && <Link className={classes.link} to={'/admin'}><IconButton
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton></Link>}
                        {this.state.login && this.state.worker && <Link className={classes.link} to={'/worker'}><IconButton
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton></Link>}
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                    position="static"
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{canteenListItems}</List>
                    <Divider />
                    <List>
                        {otherListItems}
                        {this.state.login?
                            <div>
                                <ListItem button onClick={this.handleLogoutOpen}>
                                        <ListItemIcon>
                                            <Accessibility/>
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                </ListItem>
                                {!this.state.admin&&!this.state.worker&&
                                <Link  to={'/usercenter/'+this.loginId}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AccountCircle/>
                                        </ListItemIcon>
                                        <ListItemText primary="User Center" />
                                    </ListItem>
                                </Link>}
                                {this.state.admin&&
                                <Link  to={'/admin'}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AccountCircle/>
                                        </ListItemIcon>
                                        <ListItemText primary="Admin Center" />
                                    </ListItem>
                                </Link>}
                                {this.state.worker&&
                                <Link  to={'/worker'}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AccountCircle/>
                                        </ListItemIcon>
                                        <ListItemText primary="Worker Center" />
                                    </ListItem>
                                </Link>}
                            </div>:
                            <div>
                                <ListItem button onClick={this.handleLoginOpen}>
                                    <ListItemIcon>
                                        <Accessibility/>
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </ListItem>
                                <ListItem button onClick={this.handleRegisterOpen}>
                                    <ListItemIcon>
                                        <Accessibility />
                                    </ListItemIcon>
                                    <ListItemText primary="Register" />
                                </ListItem>
                            </div>
                        }
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                    <Footer/>
                </main>
                <SearchRes open={this.state.openSearch} content={this.state.searchContent} close={this.onCloseSearch}/>
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
                                            label="ID"
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
                                            label="ID"
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
                            <div>
                                <Typography component="p">
                                    login success.
                                </Typography>
                                <Typography component="p">
                                    welcome, {this.loginName} !
                                </Typography>
                            </div>
                           }
                        {this.state.loginPattern===2 &&
                            <Typography component="p">
                                wrong password.
                            </Typography>
                        }
                        {this.state.loginPattern===3 &&
                            <Typography component="p">
                                username doesn't exist.
                            </Typography>}
                        {this.state.loginPattern===4 &&
                            <Typography component="p">
                                invalid username.
                            </Typography>}
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
                            {!this.state.admin&&!this.state.worker&&
                            <Button onClick={this.handleLoginSuccess} color="primary"> OK</Button>}
                            {this.state.admin&&
                            <Link to='/admin'><Button onClick={this.handleLoginSuccess} color="primary"> OK</Button></Link>}
                            {this.state.worker&&
                            <Link to='/worker'><Button onClick={this.handleLoginSuccess} color="primary"> OK</Button></Link>}
                        </DialogActions>
                    }
                    {this.state.loginPattern>=2 &&
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
                        {this.state.registerPattern===0 &&
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
                        </Paper>}
                        {this.state.registerPattern===1 &&
                            <div>
                                <Typography component="p">
                                    register success.
                                </Typography>
                                <Typography component="p">
                                    your id is {this.registerId} .
                                </Typography>
                            </div>
                        }
                        {this.state.registerPattern===2 &&
                            <Typography component="p">
                                repeat username.
                            </Typography>
                        }
                        {this.state.registerPattern===3 &&
                            <Typography component="p">
                                repeat phone number.
                            </Typography>
                        }
                    </DialogContent>
                    {this.state.registerPattern===0 &&
                        <DialogActions>
                            <Button onClick={this.handleRegisterClose} color="secondary">
                                Cancel
                            </Button>
                            {this.state.nameRok===true &&
                            this.state.pwdRok===true&&
                            this.state.pwdReRok===true&&
                            this.state.emailRok===true&&
                            this.state.phoneRok===true?<Button onClick={this.handleRegister} color="primary">
                                Register
                            </Button>:<Button onClick={this.handleRegister} color="primary" disabled>
                                Register
                            </Button>}
                        </DialogActions>
                    }
                    {this.state.registerPattern===1 &&
                        <DialogActions>
                            <Button onClick={this.handleRegisterSuccess} color="primary"> OK</Button>
                        </DialogActions>
                    }
                    {this.state.registerPattern>=2 &&
                    <DialogActions>
                        <Button onClick={this.handleRegisterClose} color="secondary"> Cancel </Button>
                        <Button onClick={this.handleRegisterFail} color="primary"> Try again</Button>
                    </DialogActions>
                    }
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
                <Dialog
                    open={this.state.openSetTag}
                    onClose={this.handleCloseSetTag}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle className={classes.registerTitle} id="form-dialog-title">
                        <ChildCareIcon />Set Tags
                    </DialogTitle>
                    <DialogContent>
                        <TipsToTagSetting save={this.handleCloseSetTag} userid={this.loginId}
                                          open={this.handleCloseSetTagAndOpen}/>
                    </DialogContent>
                </Dialog>
                <Snackbar
                    anchorOrigin={{ vertical:'top', horizontal:'center' }}
                    open={this.state.openSetTagHint}
                    autoHideDuration={10000}
                    onClose={this.handleCloseSetTagHint}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Task: set your tags</span>}
                    action={[<Button size="small" color="primary" onClick={this.openSetTag}>Set</Button>,
                        <Button size="small" color="secondary" onClick={this.handleCloseSetTagHint}>Later</Button>,]}
                />
                <Dialog
                    maxWidth={false}
                    open={this.state.openRecommend}
                    onClose={this.handleCloseRecommend}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle className={classes.registerTitle} id="form-dialog-title">
                        Recommends
                    </DialogTitle>
                    <DialogContent>
                        <PersonalRecommend userid={this.loginId}/>
                    </DialogContent>
                </Dialog>
                <Snackbar
                    anchorOrigin={{ vertical:'top', horizontal:'center' }}
                    open={this.state.openRecommendHint}
                    autoHideDuration={600000}
                    onClose={this.handleCloseRecommendHint}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">open to see recommend dishes</span>}
                    action={[<Button size="small" color="primary" onClick={this.handleOpenRecommend}>Show</Button>,
                        <Button size="small" color="secondary" onClick={this.handleCloseRecommendHint}>Later</Button>,]}
                />
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