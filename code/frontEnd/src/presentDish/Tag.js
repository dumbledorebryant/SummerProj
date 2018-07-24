import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
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
                    <Avatar><TagFacesIcon  /></Avatar>:null}
                label={this.state.data.tagName}
                onClick={this.handleClick(this.state.data)}

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
            <Paper className={classes.root}>
                {this.state.TagList.map(data => {
                    return (
                        <Tag data={data} key={data.tagId} addClickTag={this.addClickTag} delClickTag={this.delClickTag}/>
                    );
                })}
                </Paper>
        )
    }
}
TagList.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TagList);

