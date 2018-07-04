import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Nav from '@material-ui/core/Tab';
import constantData from './window.json';
import Typography from '@material-ui/core/Typography';
import WindowsMenu from './WindowsMenu';


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1400,

  },
});

class Floor extends React.Component {
  state = {
      value: 0,
      canteen:"一餐",             //上一级跳转的时候传来的，要给windowsMenu
      floorList:[0,1,2,3],         //0表示全部,用canteen从后端拿floorList
      floor:0,                      //默认是0, 后面通过点击某一层，传递楼层给windowsMenu
      windows:constantData.windows
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangeFloor= (event, index) => {
      let temp=[];
      let allwin=constantData.windows;
      allwin.map((item,i)=>(
          item.floor==index?temp.push(item):1
      ))
      //alert(temp[0].id);
      this.setState({ windows:temp});
  };

  render() {
    const { classes, theme } = this.props;


    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >

              {this.state.floorList.map((item,i) => (
                  <Tab label={item+"楼"} index={i} onClick={event=>this.handleChangeFloor(event,i)}></Tab>
                ))
              }

          </Tabs>

        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
            {this.state.floorList.map((item,i) => (
                <TabContainer dir={theme.direction}><WindowsMenu canteen={this.state.canteen} windows={this.state.windows} index={i} floor={i}></WindowsMenu></TabContainer>
            ))
            }

        </SwipeableViews>
      </div>
    );
  }
}

Floor.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,

};

export default withStyles(styles, { withTheme: true })(Floor);

/*
    <Tab label="全部" index={0} onClick={event=>this.handleChangeFloor(event,0)}></Tab>
    <Tab label="一楼" index={1} ></Tab>
    <Tab label="二楼" index={2}/>
    <Tab label="三楼" index={3}/>
    */

/*
<TabContainer dir={theme.direction}><WindowsMenu windows={this.state.windows} index={0}></WindowsMenu></TabContainer>
<TabContainer dir={theme.direction}><WindowsMenu windows={this.state.windows} index={1}/></TabContainer>
<TabContainer dir={theme.direction}><WindowsMenu windows={this.state.windows}index={2}/></TabContainer>
<TabContainer dir={theme.direction}><WindowsMenu windows={this.state.windows}index={3}/></TabContainer>*/
