import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
        canteen:this.props.match.params.key,           //上一级跳转的时候传来的，要给windowsMenu
        floorList:[0,1,2,3],         //0表示全部,用canteen从后端拿floorList
        floor:0,                      //默认是0, 后面通过点击某一层，传递楼层给windowsMenu
        windows:constantData.windows,
        dishesList:[],
     };

    handleChange = (event, value) => {
        this.setState({
            value
        });
    };

    handleChangeIndex = index => {
        this.setState({
            value: index
        });
    };

    handleChangeFloor= (event, index) =>
    {
        let floorList = this.state.floorList;
        let formData=new FormData();
        formData.append("restaurant",this.state.canteen);
        formData.append("floor", floorList[index]);
        formData.append("windowID",0);

        fetch('http://localhost:8080/Window/WindowsByRestaurantFloor',
        {
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response2=>{
            console.log('Request successful',response2);
            return response2.json()
                .then(result2=>{
                    this.setState({
                        windows: result2 ,
                        floor: floorList[index]
                    });
                    fetch('http://localhost:8080/Food/FoodsByWindowId',
                    {
                        credentials: 'include',
                        method:'POST',
                        mode:'cors',
                        body:formData,
                    }
                    ).then(response=>{
                        console.log('Request successful',response);
                        return response.json()
                            .then(result=>{
                                this.setState({
                                    dishesList:result
                                });
                            })
                        });
                })
        });
    };

    componentWillMount(){
        let formData=new FormData();
        formData.append("restaurant", this.state.canteen);
        formData.append("floor", 0);

        fetch('http://localhost:8080/Window/FloorListByRestaurant',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                if (result[0] === 0){
                    this.setState({
                        floorList:result
                    });
                }
                fetch('http://localhost:8080/Window/WindowsByRestaurantFloor',
                {
                    credentials: 'include',
                    method:'POST',
                    mode:'cors',
                    body:formData,
                }).then(response2=>{
                    console.log('Request successful',response2);
                    return response2.json()
                        .then(result2=>{
                        this.setState({
                            windows:result2
                        });
                      })
                  });
              })
          });
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState({
            canteen: nextProps.match.params.key
        });
        let formData=new FormData();
        formData.append("restaurant", nextProps.match.params.key);
        formData.append("floor", 0);
        fetch('http://localhost:8080/Window/FloorListByRestaurant',
        {
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json()
                .then(result=>{
                    if (result[0] === 0){
                        this.setState({
                            floorList:result,floor:0
                        });
                    }
                    fetch('http://localhost:8080/Window/WindowsByRestaurantFloor',
                    {
                        credentials: 'include',
                        method:'POST',
                        mode:'cors',
                        body:formData,
                    }).then(response2=>{
                        console.log('Request successful',response2);
                        return response2.json().then(result2=>{
                            this.setState({
                                windows : result2,value:0
                            });
                        })
                    });
                })
            });
    }
    render()
    {
        const {classes, theme} = this.props;
        return (
            <div className={classes.root}>

            <AppBar position="static" color="default">
              <Tabs key = {this.state.canteen}
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                  {this.state.floorList.map((item,i) => (
                      i===0 ?
                          <Tab label="全部" index={i} onClick={event=>this.handleChangeFloor(event,i)}/>:
                          <Tab label={item+"楼"} index={i} onClick={event=>this.handleChangeFloor(event,i)}/>
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
                        <TabContainer dir={theme.direction}>
                            <WindowsMenu key={this.state.canteen+this.state.floor}
                                         canteen={this.state.canteen}
                                         windowList={this.state.windows}
                                         index={i}
                                         floor={this.state.floor}/>
                        </TabContainer>
                    ))}
                </SwipeableViews>
          </div>
        );
    }
}

Floor.propTypes =
{
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(Floor);
