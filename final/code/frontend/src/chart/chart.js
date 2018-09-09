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
import {theme2,primaryColor,secondaryColor,fontColor} from '../style/style'
import {MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import  'echarts/lib/chart/line';
import  'echarts/lib/component/legend';
import  'echarts/lib/component/dataZoom';

const chartStyle= theme => ({
    root:{
        margin:20,
        flexGrow: 1,
        zIndex: 1,
       // overflow: 'hidden',
        //position: 'relative',
        display: 'flex',
    },
    formControl: {
        margin: 20,
        minWidth: 120,
    },
    paper:{
        paddingTop:40,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:40,
        overflow: 'scroll',
        minWidth:900,
        width: '100%',
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
    progress: {
        margin: theme.spacing.unit * 2,
        align:'center',
    },
});



class TempChart extends React.Component {
    state={
        chartMode:"0",
        historyMode:"0",
        currentData:null,
        totalData:null,
        label:null,
        currentLength:0,
        historyCurrentData:null,
        historyTotalData:null,
        hopeCurrentData:null,
        hopeTotalData:null,
        windowId:1,
        restaurant:"one",
        windows:[],
        time:null,
        currentWaitTime:'N/A',
        picReady:false,
        pic:null,
        updateTime: "N/A",
        canteenTime: false,
    };

    componentWillMount(){
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
                this.setState({windows:result});
            })
        });
        let formdata2=new FormData();
        formdata2.append("window",1);
        fetch('http://localhost:8080/Data/GetTime',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formdata2,
        }).then(response=>{
            console.log('Request successful',response);
            return response.text().then(result=>{
                this.setState({time:result});
            })
        });
        //this.drawChart(1);
    }

    componentDidMount(){
        let formdata = new FormData();
        formdata.append("windowId",1);
        fetch('http://localhost:8080/Window/GetPic',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formdata,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({
                    pic:result[0],
                    picReady:true,
                });

            });
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
            this.setState({
                canteenTime: false
            });
            return;
        }
        this.setState({
            canteenTime: true,
        });
        let _this=this;
        setInterval(function(){

            _this.updateCurrentChart();

        },120000);
        this.myChart = echarts.init(document.getElementById('chart'));
        this.getCurrentData(1);
    };

    static getOption(ydata, ydata2, xdata){
        return {
            tooltip: {
                show: true,
            },
            legend:{
                type: 'plain',
                show: true,
                data:['current', 'history'],
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
                name: 'current',
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
                name: 'history',
                type: 'line',
                data: ydata2,
                lineStyle:{
                    color: '#f2aeae',
                    type: 'dashed'
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

    getCurrentData = (windowId) =>{
        fetch('http://localhost:5000/data/now?windowId='+windowId, {
            credentials: 'include',
            method:'GET',
            mode:'cors',
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.dataNow = result;
                fetch('http://localhost:5000/data/yesterday?windowId='+windowId, {
                    credentials: 'include',
                    method:'GET',
                    mode:'cors',
                }).then(response2=>{
                    console.log('Request successful',response2);
                    return response2.json().then(result2=>{
                        this.dataNow = this.dataNow.slice(0, TempChart.getTimeIndex()+1);
                        this.dataYesterday = result2;
                       // this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataYesterday, this.timeSeries));
                        this.totalDataNow = TempChart.getTotalData(this.dataNow);
                        this.totalDataYesterday = TempChart.getTotalData(this.dataYesterday);
                        if (this.state.chartMode === "0"){
                            if (this.state.historyMode === "0"){
                                this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataYesterday, this.timeSeries));
                            }
                            else {
                                this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataPredict, this.timeSeries));
                            }
                        }
                        else{
                            if (this.state.historyMode === "0"){
                                this.myChart.setOption(TempChart.getOption(this.totalDataNow, this.totalDataYesterday, this.timeSeries));
                            }
                            else {
                                this.myChart.setOption(TempChart.getOption(this.totalDataNow, this.totalDataPredict, this.timeSeries));
                            }
                        }
                        if (this.dataNow.length > 0) {
                            this.setState({
                                updateTime: this.timeSeries[this.dataNow.length - 1],
                                currentLength: this.dataNow[this.dataNow.length - 1]
                            })
                        }
                        else{
                            this.setState({
                                updateTime: "N/A",
                                currentLength: 0
                            })
                        }
                        this.initWaitTime(this.dataNow);
                    });
                });
                fetch('http://localhost:5000/data/predict?windowId='+windowId, {
                    credentials: 'include',
                    method:'GET',
                    mode:'cors',
                }).then(response3=>{
                    console.log('Request successful',response3);
                    return response3.json().then(result3=>{
                        this.dataPredict = result3;
                        this.totalDataPredict = TempChart.getTotalData(this.dataPredict);
                    });
                });
            });
        });
    };

    updateCurrentChart = () =>{
        fetch('http://localhost:5000/data/now?windowId='+this.state.windowId, {
            credentials: 'include',
            method:'GET',
            mode:'cors',
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.dataNow = result.slice(0, TempChart.getTimeIndex()+1);
                this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataYesterday, this.timeSeries));
                this.totalDataNow = TempChart.getTotalData(this.dataNow);
                if (this.state.chartMode === "0"){
                    if (this.state.historyMode === "0"){
                        this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataYesterday, this.timeSeries));
                    }
                    else {
                        this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataPredict, this.timeSeries));
                    }
                }
                else{
                    if (this.state.historyMode === "0"){
                        this.myChart.setOption(TempChart.getOption(this.totalDataNow, this.totalDataYesterday, this.timeSeries));
                    }
                    else {
                        this.myChart.setOption(TempChart.getOption(this.totalDataNow, this.totalDataPredict, this.timeSeries));
                    }
                }
                if (this.dataNow.length > 0) {
                    this.setState({
                        updateTime: this.timeSeries[this.dataNow.length - 1],
                        currentLength: this.dataNow[this.dataNow.length - 1]
                    });
                    this.initWaitTime(this.dataNow);
                }
                else {
                    this.setState({
                        updateTime: "N/A",
                        currentLength: 0,
                        currentWaitTime: "N/A"
                    })
                }
            });
        });
    };

    initWaitTime = (data)=>{
        let date=new Date(this.state.time);
        let avgCost=date.getMinutes()*60+date.getSeconds();
        let totalCost=0;
        let temp=0;
        let i=0;
        let numberData=data;
        while (i<data.length){
            let number=numberData[i]==null?0:numberData[i];
            temp=number*avgCost+totalCost-120;
            totalCost=temp<0? 0:temp;
            i++;
        }
        totalCost=new Date(totalCost*1000);
        let min=totalCost.getMinutes().toString().length===1? "0"+totalCost.getMinutes():totalCost.getMinutes();
        let second=totalCost.getSeconds().toString().length===1? "0"+totalCost.getSeconds():totalCost.getSeconds();
        this.setState({currentWaitTime:"00:"+min+":"+second});
    };

    handleChangeChart= event =>{
        if (event.target.value === "1") {
            if (this.state.historyMode === "0") {
                this.myChart.setOption(TempChart.getOption(this.totalDataNow, this.totalDataYesterday, this.timeSeries));
            }
            else {
                this.myChart.setOption(TempChart.getOption(this.totalDataNow, this.totalDataPredict, this.timeSeries));
            }
        }
        else {
            if (this.state.historyMode === "0") {
                this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataYesterday, this.timeSeries));
            }
            else {
                this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataPredict, this.timeSeries));
            }
        }
        this.setState({chartMode:event.target.value});
    };

    handleChangeHistory= event =>{
        if (event.target.value === "0") {
            if (this.state.chartMode === "0") {
                this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataYesterday, this.timeSeries));
            }
            else {
                this.myChart.setOption(TempChart.getOption(this.totalDataNow, this.totalDataYesterday, this.timeSeries));
            }
        }
        else {
            if (this.state.chartMode === "0") {
                this.myChart.setOption(TempChart.getOption(this.dataNow, this.dataPredict, this.timeSeries));
            }
            else {
                this.myChart.setOption(TempChart.getOption(this.totalDataNow, this.totalDataPredict, this.timeSeries));
            }
        }
        this.setState({historyMode:event.target.value});
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
                this.setState({windowId:result.length>0?result[0].windowId:null, picReady:false});
                let formdata2=new FormData();
                formdata2.append("window",result[0].windowId);
                fetch('http://localhost:8080/Data/GetTime',{
                    credentials: 'include',
                    method:'POST',
                    mode:'cors',
                    body:formdata2,
                }).then(response=>{
                    console.log('Request successful',response);
                    return response.text().then(result=>{
                        this.setState({time:result});
                    })
                });
                this.getCurrentData(result[0].windowId);

                let formdata3 = new FormData();
                formdata3.append("windowId",result[0].windowId);
                fetch('http://localhost:8080/Window/GetPic',{
                    credentials: 'include',
                    method:'POST',
                    mode:'cors',
                    body:formdata3,
                }).then(response=>{
                    console.log('Request successful',response);
                    return response.json().then(result=>{
                        this.setState({
                            pic:result[0],
                            picReady:true,
                        });

                    });
                });
            })
        });

    };

    handleChangeWindow = event =>{
        this.setState({windowId:event.target.value, picReady: false});
        let formdata = new FormData();
        formdata.append("windowId",event.target.value);
        fetch('http://localhost:8080/Window/GetPic',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formdata,
        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                this.setState({
                    pic:result[0],
                    picReady:true,
                });

            });
        });
        let formdata2=new FormData();
        formdata2.append("window",event.target.value);
        fetch('http://localhost:8080/Data/GetTime',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formdata2,
        }).then(response=>{
            console.log('Request successful',response);
            return response.text().then(result=>{
                this.setState({time:result});
            })
        });
        this.getCurrentData(event.target.value);
    };

    render(){
        const { classes, theme } = this.props;
        return (
            <MuiThemeProvider theme={theme2}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper2}>
                            {this.state.picReady? <img src={this.state.pic} style={{width: '33.3%',marginLeft:20, marginRight:20, height:220,}}/>:  <CircularProgress className={classes.progress} />}

                            <List component="nav">
                                <ListItem button>
                                    <ListItemText>
                                        the number of newly coming people: {this.state.currentLength.toString()}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                                <ListItem button>
                                    <ListItemText>
                                        time to wait: {this.state.currentWaitTime}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                                <ListItem button>
                                    <ListItemText>
                                        the last time of update: {this.state.updateTime}
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl} style={{marginTop:100,}}>
                            <InputLabel htmlFor="selectRestaurant">select restaurant</InputLabel>
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
                            <InputLabel htmlFor="selectWindow">select window</InputLabel>
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
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="chartMode">History mode</InputLabel>
                            <Select
                                native
                                value={this.state.historyMode}
                                onChange={this.handleChangeHistory}
                                inputProps={{
                                    name: 'historyMode',
                                    id: 'historyMode',
                                }}
                            >
                                <option value={0}>Yesterday</option>
                                <option value={1}>Predict</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {!this.state.canteenTime && <p>还没开饭呢</p>}
                        <Paper className={classes.paper}>
                            <div id="chart" style={{ width: 1000, height: 400,}}></div>
                        </Paper>
                    </Grid>
                </Grid>

            </MuiThemeProvider>
        )
    }
}

TempChart.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(chartStyle)(TempChart);
