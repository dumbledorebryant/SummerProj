import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import constantData from './window.json';
import Avatar from '@material-ui/core/Avatar';
import PageviewIcon from '@material-ui/icons/Pageview';
import Dishes from './Dishes';
import GuttersGrid from './GuttersGrid';

const styles = theme => ({
    root: {
        width: '500%',
        maxWidth: 1260,
        backgroundColor: theme.palette.background.paper,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },

});
/*
const options = [
    '全部',
    'A窗口',
    'B窗口',
    'C窗口',
];
*/

class WindowsFoodList extends React.Component {
    button = null;
    constructor(props) {
        super(props);
    }
    state = {
        anchorEl: null,
        selectedIndex: 0,
        content:1,
        windowName:"一餐五楼A窗口",
        dishesList: this.props.dishesList //从上一级拿过来渲染就可以了
            /*[
            {
                foodname:"蛋炒饭",
                price:10,
                tips:"放了鸡蛋",
                window_id:"五餐一楼",
                like:100,
                picture:"https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=c99aafe21c950a7b613846966bb809bc/f31fbe096b63f624eef2cdd78644ebf81b4ca3b3.jpg"
            },
            {
                foodname:"牛肉面",
                price:15,
                tips:"放了牛肉",
                window_id:"五餐二楼",
                like:130,
                picture:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531293828&di=c6cbea2184bca30c5f01054809a7ab03&imgtype=jpg&er=1&src=http%3A%2F%2Fimage.suning.cn%2Fuimg%2Fsop%2Fcommodity%2F100451187013144729424040_x.jpg"
            },
            {
                foodname:"汤圆",
                price:13,
                tips:"豆沙天下第一",
                window_id:"四餐一楼",
                like:99,
                picture:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531295582&di=9ea923418530769b7e3f12b8cfd31e7d&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fc83d70cf3bc79f3d84baeae4b0a1cd11738b298e.jpg"
            }
            ],*/
    //    window:this.props.windows

    };

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        alert(index);
        this.setState({ selectedIndex: index, anchorEl: null, content:index
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div>
                <div>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}>
                            <Grid container className={classes.demo} justify="center" spacing={40} >
                                {this.state.dishesList.map((item,i) => (
                                    <Grid key={i} item><Dishes foodname={item.foodname}price={item.price}tips={item.tips}window_id={item.window_id} like={item.like}picture={item.picture}/></Grid>))
                                }
                                </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

WindowsFoodList.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(WindowsFoodList);

/*
<div className={classes.root}>
    <List component="nav">
        <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
        >
            <ListItemText
                primary={options[this.state.selectedIndex]}
            />
        </ListItem>
    </List>
    <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
    >
        {options.map((option, index) => (
            <MenuItem
                key={option}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
            >
                {option}
            </MenuItem>

        ))}
    </Menu>
</div>
*/
/*
                 <Avatar className={classes.pinkAvatar}>
                        <PageviewIcon />
                    </Avatar>
                    */