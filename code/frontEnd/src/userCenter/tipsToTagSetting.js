import React, { Component } from 'react';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ChildCareIcon from '@material-ui/icons/ChildCare';
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
import PersonalRecommend from "./personalRecommend";

const theme2=createMuiTheme({
    typography:{
        fontSize:25,
    },
});

const styles = theme => ({
    header: {
        width: '100%',
        maxWidth: 360,
    },
    root: {
        marginLeft:theme.spacing.unit*9,
        marginRight:theme.spacing.unit*20,
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit ,
    },
    chip: {
        margin: theme.spacing.unit ,
    },
    button: {
        margin: theme.spacing.unit*3,
        marginLeft:theme.spacing.unit*60
    },
    icon:{
        color:blue[500]
    },
    iconRestaurant:{
        margin: theme.spacing.unit,
        marginLeft:theme.spacing.unit,
    },
    tagTitle:{
        margin: theme.spacing.unit,
        marginLeft:theme.spacing.unit,

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
            pageState:true
        };
        this.handleClick = this.handleClick.bind(this);
        this.showTags=this.showTags.bind(this);
        this.showTags();
        this.clickButton=this.clickButton.bind(this);
    }

    clickButton(){
        let idx=this.state.step;
        console.log("step:"+idx);
        idx++;
        console.log("headerGroup[idx]:"+headerGroup);
        if(idx<=3){
            this.setState({
                header:headerGroup[idx],
                chipData:tagDataGroup[idx],
                step:idx
            });
        }
        else if(idx===4){
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
                            this.setState({
                                pageState:false
                            })
                        });
                })

        }
    }

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
                        console.log("tagDataGroup:"+tagDataGroup);
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
            <div>
                {this.state.pageState?
                    <div>
                        <div className={classes.header}>
                            <List>
                                <ListItem>
                                    <Avatar>
                                        <ChildCareIcon />
                                    </Avatar>
                                    <ListItemText primary="选择您喜欢的标签"  />
                                </ListItem>
                            </List>
                        </div>
                        <MuiThemeProvider theme={theme2}>
                            <Paper className={classes.root}>
                                <div className={classes.iconRestaurant}>
                                    <RestaurantIcon/>
                                    <a className={classes.tagTitle}>
                                        {this.state.header+" favor"}</a>
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
                        </MuiThemeProvider>
                        <Button variant="outlined"
                                color="primary"
                                className={classes.button}
                                onClick={this.clickButton}>
                            Next Step
                         </Button>
                    </div>
                    :  <div><PersonalRecommend userid={this.props.userid}/></div>}
            </div>
        );
    }
}

TipsToTagSetting.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TipsToTagSetting);

