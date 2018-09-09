import React, { Component } from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/es/Paper/Paper";
import Chip from "@material-ui/core/es/Chip/Chip";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from "@material-ui/core/es/Button/Button";
import blue from "@material-ui/core/es/colors/blue";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import Divider from '@material-ui/core/Divider';

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
    header: {
        width: '100%',
        maxWidth: 360,
    },
    root: {
       // marginLeft:theme.spacing.unit*9,
       // marginRight:theme.spacing.unit*20,
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit ,
    },
    chip: {
        margin: theme.spacing.unit ,
    },
    button: {
       // margin: theme.spacing.unit*3,
       // marginLeft:theme.spacing.unit*60
        marginLeft:20,
        marginRight:20,
        marginTop:20
    },
    icon:{
        color:blue[500]
    },
    iconRestaurant:{
        margin: theme.spacing.unit,
        marginLeft:theme.spacing.unit,
    },
    tagTitle:{
        margin:20
    }
});

const headerGroup=[];
const tagDataGroup=[];
class TipsToTagSetting extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            chipData: [],
            tagBool:[],
            step:0,
            header:"",
            openSaveTag:false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.showTags=this.showTags.bind(this);
    }

    componentWillMount(){
        this.showTags();
    };

    nextStep=()=>{
        let idx=this.state.step;
        idx++;
        this.setState({
            header:headerGroup[idx],
            chipData:tagDataGroup[idx],
            step:idx
        });
    };

    lastStep=()=>{
        let idx=this.state.step;
        idx--;
        this.setState({
            header:headerGroup[idx],
            chipData:tagDataGroup[idx],
            step:idx
        });
    };

    saveTags= () =>{
        let tagChoose=[];
        for(let i in this.state.tagBool){
            if(this.state.tagBool[i]===true){
                tagChoose.push(i);
            }
        }
        fetch('http://localhost:8080/UserTag/ChooseTag?' +
            'userID='+this.props.userid+
            '&tagArray='+tagChoose,
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        if(tagChoose.length>0){
                            this.props.open();
                        }
                        else{
                            this.props.save();
                        }
                    });
            });
    };

    showTags= () => {
        fetch('http://localhost:8080/UserTag/ShowFoodTags',
            {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        console.log("tagDataGroupResult:"+result);

                        let tagBoolTemp=[];

                        for(let k=0;k<4;k++) {
                            tagDataGroup[k] = [];
                        }
                        headerGroup.push("taste");
                        headerGroup.push("country");
                        headerGroup.push("food");
                        headerGroup.push("taboo");
                        for(let i in result){
                            let add={"key":result[i].tagId,
                                "label":result[i].tagName
                            };
                            tagBoolTemp[result[i].tagId]=false;
                            if(result[i].tagType==="taste"){
                                tagDataGroup[0].push(add);
                            }
                            if(result[i].tagType==="country"){
                                tagDataGroup[1].push(add);

                            }
                            if(result[i].tagType==="food"){
                                tagDataGroup[2].push(add);

                            }
                            if(result[i].tagType==="taboo"){
                                tagDataGroup[3].push(add);
                            }
                        }
                        this.setState({
                            chipData:tagDataGroup[0],
                            tagBool:tagBoolTemp,
                            header:headerGroup[0]
                        })
                    })
            })
    };

    handleClick = data => () => {
        let temp=this.state.tagBool;
        temp[data.key]=!temp[data.key];
        this.setState({
            tagBool:temp
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme2}>
                    <div>

                            <Paper className={classes.root}>
                                <div className={classes.iconRestaurant}>
                                    <RestaurantIcon style={{float:'left',marginRight:10}} />
                                    <typography className={classes.tagTitle}>
                                        {this.state.header+" favor"}</typography>
                                </div>
                                {this.state.chipData.map(data => {
                                    return (
                                        <Chip
                                            key={data.key}
                                            label={data.label}
                                            onDelete={this.handleClick(data)}
                                            className={classes.chip}
                                            deleteIcon={this.state.tagBool[data.key]
                                                ?<CheckCircleIcon className={classes.icon}/>
                                                :<CheckCircleIcon />}
                                        />
                                    );
                                    },this)}
                                    </Paper>
                        <Divider/>
                        {this.state.step!==3 ?
                            <div>
                                {this.state.step!==0
                                    ? <div><Button size="small" variant="outlined"
                                            color="primary"
                                            className={classes.button}
                                            onClick={this.lastStep}
                                            style={{float:'left'}}
                                    >
                                        Last Step
                                    </Button>
                                    <Button size="small" variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.nextStep}
                                    style={{float:'left'}}
                                    >
                                    Next Step
                                    </Button>
                                    <Button size="small" variant="outlined"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={this.saveTags}
                                    style={{float:'left'}}
                                    >
                                    Save & Exit
                                    </Button>
                                    </div>
                                    : <div>
                                        <Button size="small" variant="outlined"
                                                color="primary"
                                                className={classes.button}
                                                onClick={this.nextStep}
                                                style={{float:'left'}}
                                        >
                                            Next Step
                                        </Button>
                                        <Button size="small" variant="outlined"
                                                color="secondary"
                                                className={classes.button}
                                                onClick={this.saveTags}
                                                style={{float:'left'}}
                                        >
                                            Save & Exit
                                        </Button>
                                    </div>
                                }
                            </div>


                            :<div>
                                    <Button size="small" variant="outlined"
                                    color="secondary"
                                    className={classes.button}
                                           onClick={this.saveTags}>
                                        Done</Button>
                                <Button size="small" variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.lastStep}
                                        style={{float:'left'}}
                                >
                                    Last Step</Button>
                            </div>
                        }
                    </div>
            </MuiThemeProvider>
        );
    }
}

TipsToTagSetting.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TipsToTagSetting);

