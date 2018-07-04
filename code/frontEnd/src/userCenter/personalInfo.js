import React from 'react';
import {Button,Form,Image,Row,Col,FormGroup,ControlLabel,FormControl,Glyphicon} from 'react-bootstrap';
import protrait from '../img/pic.jpg'




class TextFields extends React.Component {
    render() {

        return (
            <div align="center">

                <br/>
                <br/>
                <Image src={protrait} width={"100px"}  height={"100px"}  circle />
                <br/>
                <br/>

                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"  bsStyle="primary">
                        <ControlLabel>昵称：</ControlLabel>
                        {' '}
                        <FormControl type="text" value="zbn"/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="user" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>


                <br/>

                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"  bsStyle="primary">
                        <ControlLabel>密码：</ControlLabel>
                        {' '}
                        <FormControl type="text" value="123"/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="lock" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>

                <br/>

                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"  bsStyle="primary">
                        <ControlLabel>手机：</ControlLabel>
                        {' '}
                        <FormControl type="text" value="1234"/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="earphone" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>

                <br/>

                <Form inline>
                    <FormGroup controlId="formValidationSuccess3"  bsStyle="primary">
                        <ControlLabel>邮箱：</ControlLabel>
                        {' '}
                        <FormControl type="text" value="54427@qq.com"/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="envelope" />
                        </FormControl.Feedback>
                    </FormGroup>
                </Form>
                <br/>
                <Button bsStyle="primary">提交修改</Button>

            </div>

        );
    }
}


export default TextFields
