import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
//import GutterSGrid from './GuttersGrid'
const styles = theme => ({
    card: {
        maxWidth: 1600,
        margin:20
    },
    cardHeader:{
        marginLeft:20,
        marginRight:20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class Dishes extends React.Component {
    state = {
        expanded: false,
        foodname:this.props.foodname,
        price:this.props.price,
        tips:this.props.tips,
        window_id:this.props.window_id,
        like:this.props.like,
        picture:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531295582&di=9ea923418530769b7e3f12b8cfd31e7d&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fc83d70cf3bc79f3d84baeae4b0a1cd11738b298e.jpg"

    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid>
                    <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={this.props.foodname}
                        subheader={this.props.window_name}
                        className={classes.cardHeader}
                    />
                    <CardMedia
                        className={classes.media}
                        image={this.state.picture}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography component="p">
                            Price:{this.props.price}￥
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>{this.props.like}
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph variant="body2">
                                   Tips:
                                </Typography>
                                <Typography paragraph>
                                    {this.props.tips}
                                </Typography>
                            </CardContent>
                        </Collapse>

                </Card>
                </Grid>
            </div>
        );
    }
}

Dishes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dishes);