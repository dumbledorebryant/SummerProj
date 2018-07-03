import React, { Component } from 'react';

import {Navbar, Button,Col,Label,Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';




const styles = theme => ({
    root: {
        display: 'flex',
        align:"center"

    },
    formControl: {
        margin: theme.spacing.unit * 2,

    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    choice: {
        margin: theme.spacing.unit*0.01 ,

    },
});

class PersonalSetting extends Component {

    constructor() {
        super();
        this.state = {
            value1:'',
            value2:'',
            value3:'',
            tag1:'辣',
            tag2:'中餐',
            tag3:'清真'
        };
        this.handleChange1=this.handleChange1.bind(this);
        this.handleChange2=this.handleChange2.bind(this);
        this.handleChange3=this.handleChange3.bind(this);
    }


    handleChange1 = event => {
        this.setState({ value1: event.target.value });

    };
    handleChange2 = event => {
        this.setState({ value2: event.target.value });
    };
    handleChange3 = event => {
        this.setState({ value3: event.target.value });
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <br/>
                <br/>
                <Navbar >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">口味标签设置</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>

                <Row className={classes.choice}>
                    <Col sm={1}>{'曾经选择:'}</Col>

                    <Col sm={1}>口味
                        <Label bsStyle="info">{this.state.tag1}</Label>
                    </Col>
                    <Col sm={1}>种类
                        <Label bsStyle="info">{this.state.tag2}</Label>
                    </Col>
                    <Col sm={1}>忌口
                        <Label bsStyle="info">{this.state.tag3}</Label>
                    </Col>
                </Row>
                <br/>

                <div className={classes.root} >
                    <FormControl component="fieldset" required className={classes.formControl}>
                        <FormLabel component="legend">口味</FormLabel>
                        <RadioGroup
                            className={classes.group}
                            value={this.state.value1}
                            onChange={this.handleChange1}
                        >
                            <FormControlLabel value="sour" control={<Radio color="primary"/>} label="酸" />
                            <FormControlLabel value="sweat" control={<Radio color="primary"/>} label="甜" />
                            <FormControlLabel value="spicy" control={<Radio color="primary"/>} label="辣" />
                            <FormControlLabel value="light" control={<Radio color="primary"/>} label="清淡" />
                        </RadioGroup>

                    </FormControl>
                    <FormControl component="fieldset" required className={classes.formControl}>
                        <FormLabel component="legend">种类</FormLabel>
                        <RadioGroup
                            className={classes.group}
                            value={this.state.value2}
                            onChange={this.handleChange2}
                        >
                            <FormControlLabel value="Chinese" control={<Radio color="primary"/>} label="中餐" />
                            <FormControlLabel value="Western" control={<Radio color="primary" />} label="西餐" />
                            <FormControlLabel value="JapanKorea" control={<Radio color="primary" />} label="日韩料理" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" required className={classes.formControl}>
                        <FormLabel component="legend">忌口</FormLabel>
                        <RadioGroup
                            className={classes.group}
                            value={this.state.value3}
                            onChange={this.handleChange3}
                        >
                            <FormControlLabel value="Muslim" control={<Radio color="primary"/>} label="清真" />
                            <FormControlLabel value="nonMuslim" control={<Radio color="primary" />} label="非清真" />
                        </RadioGroup>
                    </FormControl>
                </div>



                <Button bsStyle="info">提交修改</Button>


            </div>

        );
    }
}

PersonalSetting.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalSetting);




