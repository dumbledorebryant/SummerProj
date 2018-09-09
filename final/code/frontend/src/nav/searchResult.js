import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import PropTypes from "prop-types";
import {  Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root:{
        marginLeft:25,
        width:'100%'
    }
});

class SearchResult extends React.Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        if (this.props.tag === undefined){
            if (this.props.foodName.indexOf(this.props.content)!==-1){
                let d=document.getElementById(this.props.rid+"foodName");
                d.style.fontWeight='bold';
                d.style.color='#c25e00';
            }
            if (this.props.tips.indexOf(this.props.content)!==-1){
                let d=document.getElementById(this.props.rid+"tips");
                d.style.fontWeight='bold';
                d.style.color='#c25e00';
            }
        }
        else{
            let d=document.getElementById(this.props.rid+"tags");
            d.style.fontWeight='bold';
            d.style.color='#c25e00';
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div style={{float:'left',marginRight:10}}> > restaurant: <Link id={this.props.rid+"restaurant"} onClick={this.props.close} to={"/floor/" + this.props.restaurant}>{this.props.restaurant}</Link></div>
                <div> > window: <Link id={this.props.rid+"window"} onClick={this.props.close} to={"/floor/" + this.props.restaurant+":"+this.props.windowId}>
                        {this.props.windowName}
                        </Link>
                </div>
                <div style={{float:'left',marginRight:10}}> name: </div><div style={{float:'left'}} id={this.props.rid+"foodName"}>{this.props.foodName}</div>
                <div style={{float:'left',marginRight:10}}>- like: {this.props.likes} - price: {this.props.price}￥</div>
                <div style={{float:'left'}}>- tips: </div><div id={this.props.rid+"tips"}>{this.props.tips}</div>
                {this.props.tag != null &&
                    <div>
                        <div style={{float:'left',marginRight:10}}>tag: </div>
                        <div id={this.props.rid+"tags"}>{this.props.tag}</div>
                    </div>}
            </div>)
    }
}

SearchResult.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchResult);
