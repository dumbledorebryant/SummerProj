import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ChartistGraph from "react-chartist";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import dailySalesChart from './chartData'
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import echarts from "echarts/lib/echarts";
import 'echarts/lib/component/tooltip';
import  'echarts/lib/chart/line';
import  'echarts/lib/component/legend';
import  'echarts/lib/component/dataZoom';

const chartStyle= theme => ({
    root:{
        margin:20,
        // flexGrow: 1,
        zIndex: 1,
        // overflow: 'hidden',
        //position: 'relative',
        // display: 'flex',
    },
    formControl: {
        margin: 20,
        minWidth: 120,
    },
    paper:{
        display:'flex',
        paddingTop:40,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:40,
        // minWidth:900
        //width: '100%',
    },
    paper2:{
        display:'flex',
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:40,
        /* background:
         'linear-gradient(to top, #b5a6db 0%, ' +
         ' rgba(0,0,0,0) 100%)',*/
    },
});



class CompareChart extends React.Component {
    state={
        chartMode:"0",
        currentData:[],
        totalData:[],
        label:[],
        //currentLength:0,
        currentData2:[],
        totalData2:[],
        windowId:1,
        restaurant:"one",
        windows:[],
        windowId2:2,
        restaurant2:"one",
        windows2:[],
        time1:null,
        time2:null,
        currentWaitTime1:'N/A',
        currentWaitTime2:'N/A',
        timeUpdate: 'N/A',
        canteenTime: false,
    };

    componentDidMount(){
        let formdata=new FormData();
        formdata.append("restaurant","one");
        formdata.append("floor",0);
        fetch('http://localhost:8080/Window/WindowsByRestaurantFloor',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formdata,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({windows:result,windows2:result});
            })
        });

        let currentHour = new Date().getHours();
        if (currentHour >= 7 && currentHour < 10){
            let timeSeries = [];
            for (let hour = 7;hour<10;hour++){
                for (let minute = 0;minute < 60;minute += 2){
                    if (minute < 10){
                        timeSeries.push("0"+hour+":"+"0"+minute);
                    }
                    else {
                        timeSeries.push("0"+hour+":"+minute);
                    }
                }
            }
            this.timeSeries = timeSeries;
        }
        else if (currentHour >= 11 && currentHour < 14){
            let timeSeries = [];
            for (let hour = 11;hour<14;hour++){
                for (let minute = 0;minute < 60;minute += 2){
                    if (minute < 10){
                        timeSeries.push(hour+":"+"0"+minute);
                    }
                    else {
                        timeSeries.push(hour+":"+minute);
                    }
                }
            }
            this.timeSeries = timeSeries;
        }
        else if (currentHour >= 19 && currentHour < 22){
            let timeSeries = [];
            for (let hour = 19;hour<22;hour++){
                for (let minute = 0;minute < 60;minute += 2){
                    if (minute < 10){
                        timeSeries.push(hour+":"+"0"+minute);
                    }
                    else {
                        timeSeries.push(hour+":"+minute);
                    }
                }
            }
            this.timeSeries = timeSeries;
        }
        else{
            this.timeSeries = [];
            this.setState({canteenTime: false});
            return;
        }
        this.setState({canteenTime: true});
        this.myChart = echarts.init(document.getElementById('compareChart'));
    }


    initWaitTime1 = (data)=>{
        let date=new Date(this.state.time1);
        let avgCost=date.getMinutes()*60+date.getSeconds();
        let totalCost=0;
        let temp=0;
        let i=0;
        let numberData=data;
        while (i<15){
            let number=numberData[i]==null?0:numberData[i];
            temp=number*avgCost+totalCost-120;
            totalCost=temp<0? 0:temp;
            i++;
        }
        totalCost=new Date(totalCost*1000);
        let min=totalCost.getMinutes().toString().length===1? "0"+totalCost.getMinutes():totalCost.getMinutes();
        let second=totalCost.getSeconds().toString().length===1? "0"+totalCost.getSeconds():totalCost.getSeconds();
        this.setState({currentWaitTime1:"00:"+min+":"+second});

        // this.setState({currentWaitTime:totalCost});
    };

    initWaitTime2 = (data)=>{
        let date=new Date(this.state.time2);
        let avgCost=date.getMinutes()*60+date.getSeconds();
        let totalCost=0;
        let temp=0;
        let i=0;
        let numberData=data;
        while (i<15){
            let number=numberData[i]==null?0:numberData[i];
            temp=number*avgCost+totalCost-120;
            totalCost=temp<0? 0:temp;
            i++;
        }
        totalCost=new Date(totalCost*1000);
        let min=totalCost.getMinutes().toString().length===1? "0"+totalCost.getMinutes():totalCost.getMinutes();
        let second=totalCost.getSeconds().toString().length===1? "0"+totalCost.getSeconds():totalCost.getSeconds();
        this.setState({currentWaitTime2:"00:"+min+":"+second});
    };

    static getTimeIndex = () =>{
        let date = new Date();
        let currentHour = date.getHours();
        let currentMinute = date.getMinutes();
        let index = 0;
        if (currentHour >= 7 && currentHour < 10){
            index = (currentHour-7)*30+currentMinute/2;
        }
        else if (currentHour >= 11 && currentHour < 14){
            index = (currentHour-11)*30+currentMinute/2;
        }
        else if (currentHour >= 19 && currentHour < 22){
            index = (currentHour-19)*30+currentMinute/2;
        }
        return index;
    };

    static getOption(ydata, ydata2, xdata){
        return {
            tooltip: {
                show: true,
            },
            legend:{
                type: 'plain',
                show: true,
                data:['window1', 'window2'],
            },
            dataZoom:[{
                type: 'slider',
            }],
            xAxis: {
                data: xdata,
                axisPointer:{
                    show:true,
                }
            },
            yAxis: {},
            series: [{
                name: 'window1',
                type: 'line',
                data: ydata,
                lineStyle:{
                    color: '#c5e1a5',
                },
                itemStyle:{
                    color: '#c5e1a5',
                },
                smooth: true,
                symbol: 'none',
            },{
                name: 'window2',
                type: 'line',
                data: ydata2,
                lineStyle:{
                    color: '#f2aeae',
                },
                itemStyle:{
                    color: '#f2aeae',
                },
                smooth: true,
                symbol: 'none',
            }]
        }
    }

    static getTotalData = (data) =>{
        let totalData = JSON.parse(JSON.stringify(data));
        for (let i=1;i<totalData.length;i++){
            totalData[i] += totalData[i-1];
        }
        return totalData;
    };

    drawChart = (windowId,windowId2) =>{
        if (this.timeSeries.length === 0) return;
        fetch('http://localhost:5000/data/now?windowId='+windowId, {
            credentials: 'include',
            method:'GET',
            mode:'cors',
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.dataNow = result.slice(0, CompareChart.getTimeIndex()+1);
                this.totalDataNow = CompareChart.getTotalData(this.dataNow);
                this.initWaitTime1(this.dataNow);
                fetch('http://localhost:5000/data/now?windowId='+windowId2, {
                    credentials: 'include',
                    method:'GET',
                    mode:'cors',
                }).then(response=>{
                    console.log('Request successful',response);
                    return response.json().then(result=>{
                        this.dataNow2 = result.slice(0, CompareChart.getTimeIndex()+1);
                        this.totalDataNow2 = CompareChart.getTotalData(this.dataNow2);
                        this.initWaitTime2(this.dataNow2);
                        if (this.state.chartMode === "0") {
                            this.myChart.setOption(CompareChart.getOption(this.dataNow,
                                this.dataNow2, this.timeSeries.slice(0, CompareChart.getTimeIndex() + 1)));
                        }
                        else {
                            this.myChart.setOption(CompareChart.getOption(this.totalDataNow,
                                this.totalDataNow2, this.timeSeries.slice(0, CompareChart.getTimeIndex() + 1)));
                        }
                        this.setState({
                            timeUpdate: this.timeSeries[this.dataNow.length - 1],
                        });
                    })
                });
            })
        });

    };


    handleChangeChart= event =>{
        if (event.target.value === "0"){
            this.myChart.setOption(CompareChart.getOption(this.dataNow,
                this.dataNow2, this.timeSeries.slice(0, CompareChart.getTimeIndex() + 1)));
        }
        else {
            this.myChart.setOption(CompareChart.getOption(this.totalDataNow,
                this.totalDataNow2, this.timeSeries.slice(0, CompareChart.getTimeIndex() + 1)));
        }
        this.setState({chartMode:event.target.value});
    };

    handleChangeRestaurant = event =>{
        this.setState({restaurant:event.target.value});
        let formdata=new FormData();
        formdata.append("restaurant",event.target.value);
        formdata.append("floor",0);
        fetch('http://localhost:8080/Window/WindowsByRestaurantFloor',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formdata,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({windows:result});
                this.setState({windowId:result[0].windowId});
                //this.drawChart(result[0].windowId);
            })
        });

    };

    handleChangeRestaurant2 = event =>{
        this.setState({restaurant2:event.target.value});
        let formdata=new FormData();
        formdata.append("restaurant",event.target.value);
        formdata.append("floor",0);
        fetch('http://localhost:8080/Window/WindowsByRestaurantFloor',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formdata,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({windows2:result});
                this.setState({windowId2:result[0].windowId});
               // this.drawChart(result[0].windowId);
            })
        });

    };

    handleChangeWindow = event =>{
        this.setState({windowId:event.target.value});
    };

    handleChangeWindow2 = event =>{
        this.setState({windowId2:event.target.value});
    };

    handleCompare =()=>{
        let formdata=new FormData();
        formdata.append("window",this.state.windowId);
        fetch('http://localhost:8080/Data/GetTime',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formdata,
        }).then(response=>{
            console.log('Request successful',response);
            return response.text().then(result=>{
                this.setState({time1:result});
            })
        });
        let formdata2=new FormData();
        formdata2.append("window",this.state.windowId2);
        fetch('http://localhost:8080/Data/GetTime',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formdata2,
        }).then(response=>{
            console.log('Request successful',response);
            return response.text().then(result=>{
                this.setState({time2:result});
            })
        });

        this.drawChart(this.state.windowId,this.state.windowId2);

    };

    render(){
        const { classes, theme } = this.props;
        return (

            <Grid container spacing={24}>
                <Grid item xs={12}>
                    {!this.state.canteenTime && <p>还没开饭呢</p>}
                    <Paper className={classes.paper}>
                        <div id="compareChart" style={{ width: 1000, height: 400,}}></div>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="selectRestaurant">select restaurant1</InputLabel>
                        <Select
                            native
                            value={this.state.restaurant}
                            onChange={this.handleChangeRestaurant}
                            inputProps={{
                                name: 'selectRestaurant',
                                id: 'selectRestaurant',
                            }}
                        >
                            <option value={"one"}>Canteen One</option>
                            <option value={"two"}>Canteen Two</option>
                            <option value={"three"}>Canteen Three</option>
                            <option value={"four"}>Canteen Four</option>
                            <option value={"five"}>Canteen Five</option>
                            <option value={"six"}>Canteen Six</option>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="selectWindow">select window2</InputLabel>
                        <Select
                            native
                            value={this.state.windowId}
                            onChange={this.handleChangeWindow}
                            inputProps={{
                                name: 'selectWindow',
                                id: 'selectWindow',
                            }}
                        >
                            {this.state.windows.map((item,i) =>
                                (
                                    <option key={item.windowId} value={item.windowId}>{item.windowName}</option>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="selectRestaurant">select restaurant2</InputLabel>
                        <Select
                            native
                            value={this.state.restaurant2}
                            onChange={this.handleChangeRestaurant2}
                            inputProps={{
                                name: 'selectRestaurant2',
                                id: 'selectRestaurant2',
                            }}
                        >
                            <option value={"one"}>Canteen One</option>
                            <option value={"two"}>Canteen Two</option>
                            <option value={"three"}>Canteen Three</option>
                            <option value={"four"}>Canteen Four</option>
                            <option value={"five"}>Canteen Five</option>
                            <option value={"six"}>Canteen Six</option>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="selectWindow">select window2</InputLabel>
                        <Select
                            native
                            value={this.state.windowId2}
                            onChange={this.handleChangeWindow2}
                            inputProps={{
                                name: 'selectWindow2',
                                id: 'selectWindow2',
                            }}
                        >
                            {this.state.windows2.map((item,i) =>
                                (
                                    <option key={item.windowId} value={item.windowId}>{item.windowName}</option>
                                ))}
                        </Select>
                    </FormControl>
                    <Button size="small" variant="outlined" color="primary" onClick={this.handleCompare}>compare</Button>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="chartMode">chart mode</InputLabel>
                        <Select
                            native
                            value={this.state.chartMode}
                            onChange={this.handleChangeChart}
                            inputProps={{
                                name: 'chartMode',
                                id: 'chartMode',
                            }}
                        >
                            <option value={0}>Current</option>
                            <option value={1}>Total</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <Paper className={classes.paper2}>
                        <List component="nav">
                            <ListItem button>
                                <ListItemText>
                                    time for window1 to wait: {this.state.currentWaitTime1}
                                </ListItemText>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText>
                                    time for window2 to wait: {this.state.currentWaitTime2}
                                </ListItemText>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText>
                                    the last time of update: {this.state.timeUpdate}
                                </ListItemText>
                            </ListItem>

                        </List>
                    </Paper>
                </Grid>
            </Grid>


        )
    }
}

CompareChart.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(chartStyle)(CompareChart);