import React from 'react'
import ingram from "../../img/Ingram.jpg"
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {
    Button,
    ButtonToolbar,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Modal,
    Row
} from "react-bootstrap";
import WorkerPage from "../../canteenWorkCenter/uploadPic";

const singleWindowData = [{"id":1, "name":"DouFu"}, {"id":2, "name":"HuangMengChick"},
    {"id":3, "name":"SuanLaPink"}, {"id":4, "name":"RiceLine"}];
const newComingData = [{"id": 1, "restaurant":"1stCanteen", "name":"SHKC1", "floor": "FirstFloor"},
    {"id": 2, "restaurant":"2ndCanteen", "name":"SHKC2", "floor": "SecondFloor"},
    {"id": 3, "restaurant":"3rdCanteen", "name":"SHKC3", "floor": "ThirdFloor"},
    {"id": 4, "restaurant":"4thCanteen", "name":"SHKC4", "floor": "FourthFloor"},
    {"id": 5, "restaurant":"5thCanteen", "name":"SHKC5", "floor": "FiFthFloor"},];
class MenuManager extends React.Component
{
    constructor() {
        super();
        this.state = {
            windowID: -1,
            name: "",
            price: -1,
            tips: "",

            sortName: undefined,
            sortOrder: undefined,

            date: "",
            newData: [],
            singleWindow: singleWindowData,

            show: false,
            img: "Ingram.jpg"
        };
        this.addNewDish = this.addNewDish.bind(this);
        this.close = this.close.bind(this);
        this.fetchInfo = this.fetchInfo.bind(this);
        this.registerInfo = this.registerInfo.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
    }

    ChangeFoodName(event){
        this.setState({
            name: event.target.value
        })
    }
    ChangePrice(event){
        this.setState({
            price: event.target.value
        })
    }
    ChangeTips(event){
        this.setState({
            tips: event.target.value
        })
    }
    addNewDish(){

    }

    close(){
        this.setState({
            show: false
        })
    }

    fetchInfo(){
        this.setState({
            newData: newComingData
        })
        /*
        let tmp = this.state.newData;
        fetch('http://localhost:8080/AdminAction/ShowNews',
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                return response.json()
                    .then(result => {
                        console.log("result: ", result);
                        tmp.splice(0, tmp.length);
                        for (let i in result) {
                            let add =
                                {
                                    "id": result[i].windowId,
                                    "restaurant": result[i].restaurant,
                                    "name": result[i].windowName,
                                    "floor": result[i].floor
                                };
                            tmp.push(add);
                        }
                        this.setState({
                            newData: tmp
                        });
                    })
            })*/
    }

    registerInfo(){
        // let tmpAll = [];
        this.setState({
            show:true
        });
        /*
        fetch('http://localhost:8080/Window/All' +
            '?windowID=' + this.state.windowID,
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                return response.json()
                    .then(result => {
                        console.log("result: ", result);
                        tmpAll.splice(0, tmpAll.length);
                        for (let i in result) {
                            let single =
                                {
                                    "id": result[i].foodId,
                                    "name": result[i].foodName
                                };
                            tmpAll.push(single);
                        }
                        this.setState({
                            singleWindow: tmpAll
                        });
                        fetch('http://localhost:8080/Window/FetchPic' +
                            '?windowID=' + this.state.windowID
                            +"&date=" + this.state.date,
                            {
                                method: 'GET',
                                mode: 'cors',
                            }
                        )
                            .then(response=> {
                                console.log('Request successful', response);
                                const blob = response.blob();
                                return blob
                                    .then(blob => {
                                        console.log("result: ", blob);
                                        let reader = new FileReader();
                                        reader.readAsDataURL(blob);
                                        reader.onload = ()=> {
                                            this.setState({
                                                img:reader.result
                                            })
                                        };
                                        this.setState({
                                            show: true
                                        });
                                    });
                            });
                    })
            });*/
    }

    onRowSelect=(row)=>{
        let rowID = row.id;
        this.setState({
            windowID: rowID
        });
    };

    render()
    {
        const options = {
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
        };
        const selectRowProp = {
            mode: 'radio',
            onSelect: this.onRowSelect,
        };

        const cellEdit = {
            mode: 'click', // click cell to edit
            blurToSave: true,
        };
        return(
            <div>
                <br/>
                <BootstrapTable data={ this.state.newData} height="300px" keyBoardNav
                                columnFilter
                                selectRow={ selectRowProp }
                                cellEdit={ cellEdit }
                                options={ options }>
                    <TableHeaderColumn dataField='id' isKey={true} dataSort={ true }>
                        WindowID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='restaurant'>Restaurant</TableHeaderColumn>
                    <TableHeaderColumn dataField='floor'>Floor</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Window Name</TableHeaderColumn>
                </BootstrapTable >
                <br/>
                <ButtonToolbar>
                    <Col md={7}/>
                    <Col md={2}>
                        <Button bsStyle="primary" onClick={this.fetchInfo}>Fetch Info</Button>
                    </Col>
                    <Col md={1}>
                        <Button bsStyle="success" onClick={this.registerInfo}>Register Info</Button>
                    </Col>
                </ButtonToolbar>
                <div className="modal-container" style={{height: 200}}>
                    <Modal show={this.state.show} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>WindowID {this.state.windowID}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col md={5}>
                                    <img src={ingram} alt="" height="300px" width="300px"/>
                                </Col>
                                <Col md={1}/>
                                <Col md={6}>
                                    <BootstrapTable data={ this.state.singleWindow} height="300px" keyBoardNav
                                                    selectRow={ selectRowProp }
                                                    cellEdit={ cellEdit }
                                                    options={ options }>
                                        <TableHeaderColumn dataField='id' isKey={true} dataSort={ true }>
                                            FoodID
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='name'>Food Name</TableHeaderColumn>
                                    </BootstrapTable >
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md={9}>
                                    <Form>
                                        <FormGroup controlId="formValidationWarning2" validationState="warning">
                                            <ControlLabel>Food Name</ControlLabel>
                                            <FormControl type="text" onChange={this.ChangeFoodName} />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup controlId="formValidationSuccess2" validationState="success">
                                            <ControlLabel>Food Prices</ControlLabel>
                                            <FormControl type="text" onChange={this.ChangePrice}/>
                                            <FormControl.Feedback />
                                            <FormGroup controlId="formValidationSuccess2" validationState="success">
                                                <ControlLabel>Food Tips</ControlLabel>
                                                <FormControl type="text" onChange={this.ChangeTips}/>
                                                <FormControl.Feedback />
                                            </FormGroup>
                                        </FormGroup>
                                    </Form>
                                    <Button onClick={this.addNewDish}>Add New Dish</Button>
                                </Col>
                                <Col md={3}>
                                    <WorkerPage/>
                                </Col>
                            </Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default MenuManager;