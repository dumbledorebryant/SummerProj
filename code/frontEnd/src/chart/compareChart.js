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
    queueInfo:{

        marginTop:20,
        fontSize:24
    },
    updateInfo:{
        marginTop:20,
        fontSize:24
    }
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
                this.setState({windows:result,windows2:result});
            })
        });

        let date=new Date();
        let hourN=date.getHours();
        let minuteN=date.getMinutes();
        let hour=hourN-1+Math.floor((minuteN+30)/60);
        let minute=(minuteN+30)%60;
        //let topHour=hour+Math.floor((minute+60)/60);
        //let topMin=(minute+60)%60;
        let topHour=hourN;
        let topMin=minuteN;
        let time="";
        let timeLabel=[];

        while (hour*60+minute<=topHour*60+topMin){
            if (minute<10 && hour<10) { time="0"+hour.toString()+":0"+minute.toString();}
            else if (minute<10){ time=hour.toString()+":0"+minute.toString();}
            else if (hour<10) {time="0"+hour.toString()+":"+minute.toString();}
            else {time=hour.toString()+":"+minute.toString();}
            timeLabel.push(time);
            hour=hour+Math.floor((minute+2)/60);
            minute=(minute+2)%60;
        }
        this.setState({label:timeLabel,});
    }



    drawChart = (windowId,windowId2) =>{
        let date=new Date();
        let hourN=date.getHours();
        let minuteN=date.getMinutes();
        let hour=hourN-1+Math.floor((minuteN+30)/60);
        let minute=(minuteN+30)%60;
        //let topHour=hour+Math.floor((minute+60)/60);
        //let topMin=(minute+60)%60;
        let topHour=hourN;
        let topMin=minuteN;
        let time="";
        let timeLabel=[];
        let testCurrentData=[];
        let testTotalData=[];
        let testTotal=0;
        let testCurrentData2=[];
        let testTotalData2=[];
        let testTotal2=0;
        //let currentLength=0;
        while (hour*60+minute<=topHour*60+topMin){
            if (minute<10 && hour<10) { time="0"+hour.toString()+":0"+minute.toString();}
            else if (minute<10){ time=hour.toString()+":0"+minute.toString();}
            else if (hour<10) {time="0"+hour.toString()+":"+minute.toString();}
            else {time=hour.toString()+":"+minute.toString();}
            timeLabel.push(time);
            hour=hour+Math.floor((minute+2)/60);
            minute=(minute+2)%60;
        }
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
        let formData = new FormData();
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
                    //currentLength=parseInt(result[result.length-1][0]);
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
                this.setState({currentData:testCurrentData,totalData:testTotalData});

            });
        });

        let formData2 = new FormData();
        formData2.append("time",formDate);
        formData2.append("window",windowId2);
        fetch('http://localhost:8080/Data/Init',{
            credentials: 'include',
            method:'POST',
            mode:'cors',
            body:formData2,

        }).then(response=>{
            console.log('Request successful',response);
            return response.json().then(result=>{
                if (result.length === 0){
                    let idx=0;
                    while (idx<15){
                        testCurrentData2.push(null);
                        testTotalData2.push(null);
                        idx++;
                    }
                }
                else {
                    //currentLength=parseInt(result[result.length-1][0]);
                    let idx = 0;
                    let iidx=0;
                    while ( iidx < result.length && idx < 15 && !(result[iidx][1].toString().substring(11, 16) >= timeLabel[idx] &&
                        result[iidx][1].toString().substring(11, 16) < timeLabel[idx + 1]) ) {
                        testCurrentData2.push(null);
                        testTotalData2.push(null);
                        idx++;
                    }
                    if (iidx < result.length) {
                        testCurrentData2.push(parseInt(result[iidx][0]));
                        testTotal2 += parseInt(result[iidx][0]);
                        testTotalData2.push(testTotal2);
                        idx++;
                        iidx++;
                        while (iidx < result.length) {
                            testCurrentData2.push(parseInt(result[iidx][0]));
                            testTotal2 += parseInt(result[iidx][0]);
                            testTotalData2.push(testTotal2);
                            idx++;
                            iidx++;
                        }
                    }

                }
                this.setState({currentData2:testCurrentData2,totalData2:testTotalData2});

            });
        });

        this.setState({label:timeLabel,});
    };


    handleChangeChart= event =>{
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
        //this.drawChart(event.target.value);
    };

    handleChangeWindow2 = event =>{
        this.setState({windowId2:event.target.value});
       // this.drawChart(event.target.value);
    };

    handleCompare =()=>{
        this.drawChart(this.state.windowId,this.state.windowId2);
    };

    render(){
        const { classes, theme } = this.props;
        return (

            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <ChartistGraph
                            className="ct-chart"
                            id ="compareChart"
                            data={this.state.chartMode==="0"?
                                {labels:this.state.label,series:[this.state.currentData,[],this.state.currentData2]}:
                                {labels:this.state.label,series:[this.state.totalData,[],this.state.totalData2]}
                            }
                            type="Line"
                            options={this.state.chartMode==="0"? dailySalesChart.options:dailySalesChart.options2}
                            listener={dailySalesChart.animation}/>
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
                    <Typography className={classes.updateInfo} component="p" color="secondary">
                        the last time of update: {this.state.label[14]}
                    </Typography>
                </Grid>
            </Grid>


        )
    }
}

CompareChart.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(chartStyle)(CompareChart);