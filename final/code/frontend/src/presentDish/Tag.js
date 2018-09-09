import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const styles = theme => ({
    root1:{
        margin:10
    },
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
        borderColor:"white",
        borderStyle:'solid',
        borderWidth:0.5,

    },
    chip : {
        width:100,
        marginLeft: theme.spacing.unit / 2 + 20,
        marginHeight:5,
        backgroundColor:"white",
        borderColor:"#c5e1a5",
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:5,
        paddingLeft:18,
        paddingRight:18,
        '&:hover, &:focus':{
            backgroundColor: "#c5e1a5",
            color: "white",
        }
    },

    chip2: {
        width:100,
        marginLeft: theme.spacing.unit / 2 + 20,
        marginHeight:5,
        backgroundColor:"#c5e1a5",
        borderWidth:1,
        borderRadius:5,
        paddingLeft:18,
        paddingRight:18

    },

});

class Tag extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            ifPick:false,
            data:this.props.data
        }
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick = data => () => {
        if(!this.state.ifPick)this.props.addClickTag(data.tagId);
        else this.props.delClickTag(data.tagId);
        this.setState({
            ifPick:!this.state.ifPick
        });
    };
    componentWillMount(){

    }


    render() {
        const { anchorEl } = this.state;

        return(
            <Chip
                key = {this.state.data.tagId}
                avatar={this.state.ifPick?
                     <TagFacesIcon  /> :null}
                label={this.state.data.tagName}
                onClick={this.handleClick(this.state.data)}
                className={this.props.className}
            />
        )
    }


}

class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.addClickTag=this.addClickTag.bind(this)
        this.delClickTag=this.delClickTag.bind(this)
    }
    state = {
        TagList:[],
        ChooseTag:[]
    };


    componentWillMount(){
        fetch('http://localhost:8080/Food/AllTags',{
            credentials: 'include',
            method:'GET',
            mode:'cors',
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({
                   TagList:result
                });
            });
        });
    }

    componentWillReceiveProps = (nextProps) =>{

    };

    addClickTag (tagId){
        this.props.addClickTag(tagId);
    };


    delClickTag (tagId){
        this.props.delClickTag(tagId);
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return(
            <div className={classes.root1}>
            <Paper className={classes.root}>
                <Chip
                    label="TASTE"
                    className={classes.chip2}
                />
                {this.state.TagList.map(data => {
                    return (
                        data.tagType==="taste"?
                        <Tag data={data} key={data.tagId} addClickTag={this.addClickTag} delClickTag={this.delClickTag}  className={classes.chip}/>:null
                );
                })}
                </Paper>
                <Paper className={classes.root}>
                    <Chip
                        label="FOOD"
                        className={classes.chip2}
                    />
                    {this.state.TagList.map(data => {
                        return (
                            data.tagType==="food"?
                                <Tag data={data} key={data.tagId} addClickTag={this.addClickTag} delClickTag={this.delClickTag}  className={classes.chip}/>:null
                        );
                    })}
                </Paper>

                <Paper className={classes.root}>
                    <Chip
                        label="COUNTRY"
                        className={classes.chip2}
                    />
                    {this.state.TagList.map(data => {
                        return (
                            data.tagType==="country"?
                                <Tag data={data} key={data.tagId} addClickTag={this.addClickTag} delClickTag={this.delClickTag}  className={classes.chip}/>:null
                        );
                    })}
                </Paper>

            </div>
        )
    }
}
TagList.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TagList);

