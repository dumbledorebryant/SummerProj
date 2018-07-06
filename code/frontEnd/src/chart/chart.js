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
import $ from 'jquery'
import dailySalesChart from './chartData'
import Tooltip from '@material-ui/core/Tooltip';

const chartStyle= theme => ({
    root:{
        margin:20,
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    formControl: {
        margin: 20,
        minWidth: 120,
    },
    cardS:{

        paddingTop:40,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:40
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



class TempChart extends React.Component {
    state={
        chartMode:"0",
        currentData:null,
        totalData:null,
        label:null,
        currentLength:0,
        historyCurrentData:null,
        historyTotalData:null,
    };

    componentWillMount(){
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
        while (hour!==topHour || minute!==topMin){
            time=hour.toString()+":"+minute.toString();
            timeLabel.push(time);
            if (hour*60+minute<hourN*60+minuteN) testCurrentData.push(minute/3);
            testHistoryCurrentData.push(minute/3+1);
            testTotal+=minute/3;
            if (hour*60+minute<hourN*60+minuteN) testTotalData.push(testTotal);
            testHistoryTotalData.push(testTotal+1);
            hour=hour+Math.floor((minute+2)/60);
            minute=(minute+2)%60;
        }
        this.setState({label:timeLabel,currentData:testCurrentData,totalData:testTotalData,
                        historyCurrentData:testHistoryCurrentData,historyTotalData:testHistoryTotalData});

    }

    componentDidMount(){

        let _this=this;
        setInterval(function(){

            _this.updateChart();

        },120000);
    };

    updateChart=()=>{
        let label=this.state.label;
        let time=label[29];
        let idx=time.indexOf(":");
        let hour=parseInt(time.substring(0,idx));
        let minute=parseInt(time.substring(idx+1));
        hour=hour+Math.floor((minute+2)/60);
        minute=(minute+2)%60;
        label.push(hour.toString()+":"+minute.toString());
        label.shift();
        let testCurrent=this.state.currentData;
        let testData=testCurrent[0]+1;
        testCurrent.push(testData);
        testCurrent.shift();
        let testHistoryCurrent=this.state.historyCurrentData;
        testHistoryCurrent.push(testData+1);
        testHistoryCurrent.shift();
        let testTotal=this.state.totalData;
        testTotal.push(testTotal[testTotal.length-1]+testData);
        testTotal.shift();
        let testHistoryTotal=this.state.historyTotalData;
        testHistoryTotal.push(testTotal[testTotal.length-1]+testData+4);
        testHistoryTotal.shift();
        this.setState({label:label,currentData:testCurrent,totalData:testTotal,
            historyCurrentData:testHistoryCurrent,historyTotalData:testHistoryTotal,currentLength:testData});
    };

    handleChangeChart= event =>{
        this.setState({chartMode:event.target.value});
    };



    render(){
        const { classes, theme } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Card chart className={classes.cardS}>
                                <ChartistGraph
                                    className="ct-chart"
                                    data={this.state.chartMode==="0"?
                                            {labels:this.state.label,series:[this.state.currentData,this.state.historyCurrentData]}:
                                            {labels:this.state.label,series:[this.state.totalData,this.state.historyTotalData]}
                                            }
                                    type="Line"
                                    options={this.state.chartMode==="0"? dailySalesChart.options:dailySalesChart.options2}
                                    listener={dailySalesChart.animation}/>
                        </Card>
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
                    </Grid>
                    <Grid item xs={6} >
                        <Typography className={classes.queueInfo} color="primary" component="p">
                            the current length of queue is {this.state.currentLength}
                            </Typography>
                        <Typography className={classes.updateInfo} component="p" color="secondary">
                            the last time of update: {this.state.label[14]}
                        </Typography>
                    </Grid>
                </Grid>
            </div>


        )
    }
}

TempChart.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(chartStyle)(TempChart);