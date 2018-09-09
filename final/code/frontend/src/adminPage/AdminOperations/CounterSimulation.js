import React from 'react'
import {
    Button,
    ButtonToolbar,
    Col,
    ControlLabel,
    FormControl,
    FormGroup, Glyphicon,
    InputGroup,
    Row,
    Tab,
    Tabs
} from "react-bootstrap";

class CounterSimulation extends React.Component
{

    constructor(){
        super();

        this.state = {
            windowID: -1
        };

        this.GetWindowID = this.GetWindowID.bind(this);
        this.ManualCreateData = this.ManualCreateData.bind(this);
        this.CreateDataByRandomTime = this.CreateDataByRandomTime.bind(this);
    }

    GetWindowID(event){
        this.setState({
            windowID: event.target.value
        });
        console.log(this.state.windowID)
    }

    ManualCreateData()
    {
        let windowID = this.state.windowID;
        if(windowID === -1)
        {
            alert("Please Input WindowID");
            return;
        }
        fetch('http://localhost:8080/DataCreateAction/createManualData' +
            '?windowID=' + windowID,
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                return response.text()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                    })
            })
    };

    CreateDataByRandomTime()
    {
        let windowID = this.state.windowID;
        if(windowID === -1)
        {
            alert("Please Input WindowID");
            return;
        }

        fetch('http://localhost:8080/DataCreateAction/createRandomData' +
            '?windowID=' + windowID,
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                return response.text()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                    })
            })
    };

    render(){
        return(
            <div>
                <Row>
                    <Col md={5}>
                        <form>
                            <FormGroup validationState="success">
                                <ControlLabel>WindowID</ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon>INPUT Content: </InputGroup.Addon>
                                    <FormControl type="text" onChange={this.GetWindowID}/>
                                </InputGroup>
                                <FormControl.Feedback>
                                    <Glyphicon glyph="star" />
                                </FormControl.Feedback>
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Manual">
                        <br/>
                        <ButtonToolbar>
                            <Col md={2}>
                                <Button bsStyle="primary" onClick={this.ManualCreateData}>Manual Create Data</Button>
                            </Col>
                        </ButtonToolbar>
                    </Tab>
                    <Tab eventKey={2} title="Time RandomCreated">
                        <br/>
                        <ButtonToolbar>
                            <Col md={2}>
                                <Button bsStyle="primary" onClick={this.CreateDataByRandomTime}>CreateDataByRandomTime</Button>
                            </Col>
                        </ButtonToolbar>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
export default CounterSimulation;