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
import SimpleListMenu from './SimpleListMenu';


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

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
      windows:constantData.windows
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
/*
  handleChangeFloor= (event, index) => {
      let temp=[];
      let allwin=constantData.windows;
      allwin.map((item,i)=>(
          item.floor==event.index?1:temp.push(item)
      ))
      alert(temp[0].name);
      this.setState({ windows:temp});
  };
*/
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


              <Tab label="全部" index={0}></Tab>
              <Tab label="一楼" index={1}></Tab>
            <Tab label="二楼" index={2}/>
            <Tab label="三楼" index={3}/>

          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >

            <TabContainer dir={theme.direction}><SimpleListMenu windows={this.state.windows} index={0}>全部</SimpleListMenu></TabContainer>
            <TabContainer dir={theme.direction}><SimpleListMenu windows={this.state.windows} index={1}/></TabContainer>
            <TabContainer dir={theme.direction}><SimpleListMenu windows={this.state.windows}index={2}/></TabContainer>
            <TabContainer dir={theme.direction}><SimpleListMenu windows={this.state.windows}index={3}/></TabContainer>

        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,

};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);