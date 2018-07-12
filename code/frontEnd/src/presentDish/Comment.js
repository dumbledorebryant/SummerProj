import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },

});


class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        userId:"-1",
        commentContent:"Nice",
    };


    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div>
                {this.props.commentList.map((item,i) => (
                    <Paper className={classes.root} elevation={1}>
                        <Typography component="p">
                            <div>{item.userName}</div>
                            <i>{item.commentDate.month+"-"+item.commentDate.date+" "+item.commentDate.hours+":"+ item.commentDate.minutes}</i>
                        </Typography>
                        <Typography variant="headline" component="p">
                            {item.commentContent}
                        </Typography>
                        <Typography component="p">
                            {this.props.userId===item.userId.toString()? <i>删除</i> :<div/>}
                        </Typography>
                    </Paper>
                ))}
            </div>
        );
    }
}
CommentList.propTypes = {
    classes: PropTypes.object.isRequired,

};
export default withStyles(styles)(CommentList);

