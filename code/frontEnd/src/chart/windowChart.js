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

const chartStyle= theme => ({
    root:{
        margin:20,
        // flexGrow: 1,
        zIndex: 1,
        // overflow: 'hidden',
        //position: 'relative',
        // display: 'flex',
        width:'100%',
    },
    formControl: {
        margin: 20,
        minWidth: 120,
    },
    paper:{
       // display:'flex',
        paddingTop:40,
        paddingBottom:20,
        paddingLeft:0,
        paddingRight:40,
        width: '100%',
        marginRight:40
    },
    queueInfo:{

        marginTop:20,
        fontSize:24
    },
    updateInfo:{
        marginTop:20,
        fontSize:24
    }
});



class WindowChart extends React.Component {
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
        windowId:this.props.windowId,
    };

    componentWillMount(){
        if (this.props.windowId !== 0) {
            this.drawChart(this.props.windowId);
        }
    }

    componentDidMount(){

        let _this=this;
        setInterval(function(){

            _this.updateChart();

        },120000);
    };

    componentWillReceiveProps=nextProps=>{
        this.setState({windowId:nextProps.windowId});
        if (nextProps.windowId !== 0) this.drawChart(nextProps.windowId);
    };

    drawChart = windowId =>{
        let date=new Date();
        let hourN=date.getHours();
        let minuteN=date.getMinutes();
        let hour=hourN-1+Math.floor((minuteN+30)/60);
        let minute=(minuteN+30)%60;
        let topHour=hour+Math.floor((minute+60)/60);
        let topMin=(minute+60)%60;
        let time="";
        let timeLabel=[];
        let testCurrentData=[];
        let testTotalData=[];
        let testTotal=0;
        let testHistoryCurrentData=[];
        let testHistoryTotalData=[];
        let testHistoryTotal=0;
        let testHopeCurrentData=[];
        let testHopeTotalData=[];
        let testHopeTotal=0;
        let currentLength=0;
        while (hour!==topHour || minute!==topMin){
            if (minute<10 && hour<10) { time="0"+hour.toString()+":0"+minute.toString();}
            else if (minute<10){ time=hour.toString()+":0"+minute.toString();}
            else if (hour<10) {time="0"+hour.toString()+":"+minute.toString();}
            else {time=hour.toString()+":"+minute.toString();}
            timeLabel.push(time);
            hour=hour+Math.floor((minute+2)/60);
            minute=(minute+2)%60;
        }
        let formData = new FormData();
        let formDate = date.getFullYear()+"-";
        if ((date.getMonth()+1).toString().length===1){formDate += "0"+(date.getMonth()+1).toString()+"-";}
        else { formDate += (date.getMonth()+1).toString()+"-"; }
        if (date.getDate().toString().length === 1){formDate += "0"+date.getDate()+" ";}
        else { formDate += date.getDate()+" "; }
        if (date.getHours().toString().length === 1){formDate += "0"+date.getHours()+":";}
        else {formDate += date.getHours()+":";}
        if (date.getMinutes().toString().length === 1){formDate += "0"+date.getMinutes()+":";}
        else {formDate += date.getMinutes()+":";}
        if (date.getSeconds().toString().length === 1){formDate += "0"+date.getSeconds();}
        else {formDate += date.getSeconds();}
        formData.append("time",formDate);
        formData.append("window",windowId);
        fetch('http://localhost:8080/Data/Init',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,

        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                if (result.length === 0){
                    let idx=0;
                    while (idx<15){
                        testCurrentData.push(null);
                        testTotalData.push(null);
                        idx++;
                    }
                }
                else {
                    currentLength=parseInt(result[result.length-1][0]);
                    let idx = 0;
                    let iidx=0;
                    while ( iidx < result.length && idx < 15 && !(result[iidx][1].toString().substring(11, 16) >= timeLabel[idx] &&
                        result[iidx][1].toString().substring(11, 16) < timeLabel[idx + 1]) ) {
                        testCurrentData.push(null);
                        testTotalData.push(null);
                        idx++;
                    }
                    if (iidx < result.length) {
                        testCurrentData.push(parseInt(result[iidx][0]));
                        testTotal += parseInt(result[iidx][0]);
                        testTotalData.push(testTotal);
                        idx++;
                        iidx++;
                        while (iidx < result.length) {
                            testCurrentData.push(parseInt(result[iidx][0]));
                            testTotal += parseInt(result[iidx][0]);
                            testTotalData.push(testTotal);
                            idx++;
                            iidx++;
                        }
                    }

                }
                this.setState({currentData:testCurrentData,totalData:testTotalData,
                    currentLength:currentLength});

            });
        });

        formData.append("time",date.toString());
        fetch('http://localhost:8080/Data/HistoryInit',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,

        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                if (result.length === 0){
                    let idx=0;
                    while (idx<30){
                        testHistoryCurrentData.push(null);
                        testHistoryTotalData.push(null);
                        idx++;
                    }
                }
                else{
                    let idx=0;
                    let iidx=0;
                    while (iidx < result.length && idx < 29 && !(result[iidx][1].toString().substring(11,16)>=timeLabel[idx] &&
                        result[iidx][1].toString().substring(11,16)<=timeLabel[idx+1])) {
                        testHistoryCurrentData.push(null);
                        testHistoryTotalData.push(null);
                        idx++;
                    }
                    if (iidx < result.length){
                        testHistoryCurrentData.push(parseInt(result[iidx][0]));
                        testHistoryTotal+=parseInt(result[iidx][0]);
                        testHistoryTotalData.push(testHistoryTotal);
                        idx++;
                        iidx++;
                        while (iidx < result.length){
                            /* if (!(result[iidx][1].toString().substring(11,16)>=timeLabel[idx] &&
                                     result[iidx][1].toString().substring(11,16)<=timeLabel[idx+1])){
                                 testHistoryCurrentData.push(null);
                                 testHistoryTotalData.push(null);
                                 idx++;
                             }
                             else{*/
                            testHistoryCurrentData.push(parseInt(result[iidx][0]));
                            testHistoryTotal+=parseInt(result[iidx][0]);
                            testHistoryTotalData.push(testHistoryTotal);
                            idx++;
                            iidx++;
                            //}
                        }
                        while (idx < 30){
                            testHistoryCurrentData.push(null);
                            testHistoryTotalData.push(null);
                            idx++;
                        }
                    }
                    else{
                        while (idx < 30){
                            testHistoryCurrentData.push(null);
                            testHistoryTotalData.push(null);
                            idx++;
                        }
                    }
                }
                this.setState({historyCurrentData:testHistoryCurrentData,historyTotalData:testHistoryTotalData,});
            });
        });
        fetch('http://localhost:8080/Data/HopeInit',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData,

        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                if (result.length === 0){
                    let idx=0;
                    while (idx<30){
                        testHopeCurrentData.push(null);
                        testHopeTotalData.push(null);
                        idx++;
                    }
                }
                else{
                    let idx=0;
                    let iidx=0;
                    while (iidx < result.length && idx < 29 && !(result[iidx][1].toString().substring(11,16)>=timeLabel[idx] &&
                        result[iidx][1].toString().substring(11,16)<=timeLabel[idx+1])) {
                        testHopeCurrentData.push(null);
                        testHopeTotalData.push(null);
                        idx++;
                    }
                    if (iidx < result.length){
                        testHopeCurrentData.push(parseInt(result[iidx][0]));
                        testHopeTotal+=parseInt(result[iidx][0]);
                        testHopeTotalData.push(testHopeTotal);
                        idx++;
                        iidx++;
                        while (iidx < result.length){
                            /* if (!(result[iidx][1].toString().substring(11,16)>=timeLabel[idx] &&
                                     result[iidx][1].toString().substring(11,16)<=timeLabel[idx+1])){
                                 testHopeCurrentData.push(null);
                                 testHopeTotalData.push(null);
                                 idx++;
                             }
                             else{*/
                            testHopeCurrentData.push(parseInt(result[iidx][0]));
                            testHopeTotal+=parseInt(result[iidx][0]);
                            testHopeTotalData.push(testHopeTotal);
                            idx++;
                            iidx++;
                            //}
                        }
                        while (idx < 30){
                            testHopeCurrentData.push(null);
                            testHopeTotalData.push(null);
                            idx++;
                        }
                    }
                    else{
                        while (idx < 30){
                            testHopeCurrentData.push(null);
                            testHopeTotalData.push(null);
                            idx++;
                        }
                    }
                }
                this.setState({hopeCurrentData:testHopeCurrentData,hopeTotalData:testHopeTotalData,});
            });
        });

        this.setState({label:timeLabel,});
    };

    updateChart=()=>{
        if (this.state.windowId !== 0) {
            let label = this.state.label;
            let date = new Date();
            let hourN = date.getHours();
            let minuteN = date.getMinutes();
            label.push(hourN.toString() + ":" + minuteN.toString());
            label.shift();
            let formData = new FormData();
            let formData2 = new FormData();
            let formDate = date.getFullYear() + "-";
            if ((date.getMonth() + 1).toString().length === 1) {
                formDate += "0" + (date.getMonth() + 1).toString() + "-";
            }
            else {
                formDate += (date.getMonth() + 1).toString() + "-";
            }
            if (date.getDate().toString().length === 1) {
                formDate += "0" + date.getDate() + " ";
            }
            else {
                formDate += date.getDate() + " ";
            }
            if (date.getHours().toString().length === 1) {
                formDate += "0" + date.getHours() + ":";
            }
            else {
                formDate += date.getHours() + ":";
            }
            if (date.getMinutes().toString().length === 1) {
                formDate += "0" + date.getMinutes() + ":";
            }
            else {
                formDate += date.getMinutes() + ":";
            }
            if (date.getSeconds().toString().length === 1) {
                formDate += "0" + date.getSeconds();
            }
            else {
                formDate += date.getSeconds();
            }
            formData.append("time", formDate);
            formData.append("window", this.state.windowId);
            formData2.append("window", this.state.windowId);
            let testCurrent = this.state.currentData;
            let testTotal = this.state.totalData;
            let testHistoryCurrent = this.state.historyCurrentData;
            let testHistoryTotal = this.state.historyTotalData;
            let testHopeCurrent=this.state.hopeCurrentData;
            let testHopeTotal=this.state.hopeTotalData;
            let total = 0;
            let currentLength = 0;
            if (testTotal.length > 0) {
                if (testTotal[testTotal.length - 1] != null) {
                    total = testTotal[testTotal.length - 1];
                }
            }
            let historyTotal = 0;
            if (testHistoryTotal.length > 0) {
                if (testHistoryTotal[testHistoryTotal.length - 1] != null) {
                    historyTotal = testHistoryTotal[testHistoryTotal.length - 1];
                }
            }
            let hopeTotal=0;
            if (testHopeTotal.length>0){
                if (testHopeTotal[testHopeTotal.length-1]!=null){
                    hopeTotal=testHopeTotal[testHopeTotal.length-1];
                }
            }
            fetch('http://localhost:8080/Data/Current', {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: formData2

            }).then(response => {
                console.log('Request successful', response);
                return response.json().then(result => {
                    if (result != null) {
                        currentLength = parseInt(result[0]);
                        testCurrent.push(currentLength);
                        testCurrent.shift();
                        total += currentLength;
                        testTotal.push(total);
                        testTotal.shift();
                    }
                    else {
                        testCurrent.push(null);
                        testCurrent.shift();
                        testTotal.push(null);
                        testTotal.shift();
                    }
                    this.setState({
                        currentData: testCurrent, totalData: testTotal,
                        currentLength: currentLength
                    });
                });
            });
            fetch('http://localhost:8080/Data/HistoryCurrent', {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: formData,
            }).then(response => {
                console.log('Request successful', response);
                return response.json().then(result => {
                    if (result != null) {
                        testHistoryCurrent.push(parseInt(result[0]));
                        testHistoryCurrent.shift();
                        historyTotal += parseInt(result[0]);
                        testHistoryTotal.push(historyTotal);
                        testHistoryTotal.shift();
                    }
                    else {
                        testHistoryCurrent.push(null);
                        testHistoryCurrent.shift();
                        testHistoryTotal.push(null);
                        testHistoryTotal.shift();
                    }
                    this.setState({historyCurrentData: testHistoryCurrent, historyTotalData: testHistoryTotal,});
                });
            });
            fetch('http://localhost:8080/Data/HopeCurrent',{
                credentials: 'include',
                method:'POST',
                mode:'cors',
                body: formData,
            }).then(response=>{
                console.log('Request successful',response);
                return response.json().then(result=>{
                    if (result!=null){
                        testHopeCurrent.push(parseInt(result[0]));
                        testHopeCurrent.shift();
                        hopeTotal+=parseInt(result[0]);
                        testHopeTotal.push(hopeTotal);
                        testHopeTotal.shift();
                    }
                    else {
                        testHopeCurrent.push(null);
                        testHopeCurrent.shift();
                        testHopeTotal.push(null);
                        testHopeTotal.shift();
                    }
                    this.setState({hopeCurrentData:testHopeCurrent,hopeTotalData:testHopeTotal,});
                });
            });
            this.setState({label: label,});

        }
    };

    handleChangeChart= event =>{
        this.setState({chartMode:event.target.value});
    };

    handleChangeHistory= event =>{
        this.setState({historyMode:event.target.value});
    };

    render(){
        const { classes, theme } = this.props;
        if (this.props.windowId!==0){
            return (
                <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {this.state.historyMode === "0" &&<ChartistGraph

                                className="ct-chart"
                                data={this.state.chartMode==="0"?
                                    {labels:this.state.label,series:[this.state.currentData,this.state.historyCurrentData]}:
                                    {labels:this.state.label,series:[this.state.totalData,this.state.historyTotalData]}
                                }
                                type="Line"
                                options={this.state.chartMode==="0"? dailySalesChart.options:dailySalesChart.options2}
                                listener={dailySalesChart.animation}/>}
                            {this.state.historyMode === "1" &&<ChartistGraph

                                className="ct-chart"
                                data={this.state.chartMode==="0"?
                                    {labels:this.state.label,series:[this.state.currentData,this.state.hopeCurrentData]}:
                                    {labels:this.state.label,series:[this.state.totalData,this.state.hopeTotalData]}
                                }
                                type="Line"
                                options={this.state.chartMode==="0"? dailySalesChart.options:dailySalesChart.options2}
                                listener={dailySalesChart.animation}/>}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
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

                    <Grid item xs={6} >
                        <Typography className={classes.queueInfo} color="primary" component="p">
                            the current length of queue is {this.state.currentLength.toString()}
                        </Typography>
                        <Typography className={classes.updateInfo} component="p" color="secondary">
                            the last time of update: {this.state.label[14]}
                        </Typography>
                    </Grid>

                </Grid>
                </div>


            )
        }
        else {
            return (<p> </p>)
        }
    }
}

WindowChart.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(chartStyle)(WindowChart);