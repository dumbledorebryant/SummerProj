import React from 'react'
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
import UploadPic from "../../PicUpload/UploadPic";

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
            singleWindow: [],

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
                            if (result.hasOwnProperty(i)) {
                                let add =
                                    {
                                        "id": result[i].windowId,
                                        "restaurant": result[i].restaurant,
                                        "name": result[i].windowName,
                                        "floor": result[i].floor
                                    };
                                tmp.push(add);
                            }
                        }
                        this.setState({
                            newData: tmp
                        });
                    })
            })
    }

    registerInfo(){
        let tmpAll = [];

        fetch('http://localhost:8080/AdminAction/checkWindow' +
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

                        for(let key in result)
                        {
                            if (result.hasOwnProperty(key))
                            {
                                let single =
                                    {
                                        "id": key,
                                        "name": result[key]
                                    };
                                tmpAll.push(single);
                            }
                        }

                        this.setState({
                            singleWindow: tmpAll
                        });
                        fetch('http://localhost:8080/AdminAction/fetchWinowPic' +
                            '?windowID=' + this.state.windowID,
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
            });
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
                                    <img src={this.state.img} alt="" height="300px" width="300px"/>
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
                                    <UploadPic/>
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