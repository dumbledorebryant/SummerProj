import React from 'react'
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import {Button, ButtonToolbar, Col, Modal} from "react-bootstrap";

class UserManager extends React.Component
{
    constructor() {
        super();
        this.state = {
            rowIDs: new FormData(),
            userData: [],

            sortName: undefined,
            sortOrder: undefined,

            show: false,
            img: ""
        };
        this.onRowSelect = this.onRowSelect.bind(this);
        this.showUser = this.showUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.freezeUser = this.freezeUser.bind(this);
        this.activateUser = this.activateUser.bind(this);
        this.close = this.close.bind(this);
    }

    close(){
        this.setState({
            show: false
        })
    }


    showUser(){
        let tmp = [];
        fetch('http://localhost:8080/AdminAction/showUsers',
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
                                        "id": result[i].userId,
                                        "name": result[i].username,
                                        "pwd": result[i].password,
                                        "email": result[i].email,
                                        "phone": result[i].phone,
                                        "valid": result[i].valid
                                    };
                                tmp.push(add);
                            }
                        }
                        this.setState({
                            userData: tmp
                        });
                    })
            })
    }

    deleteUser(){
        let deletedUserIDs = this.state.rowIDs;
        fetch('http://localhost:8080/AdminAction/deleteUsers',
            {
                method: 'POST',
                mode: 'cors',
                body: deletedUserIDs
            }
        )
            .then(response => {
                return response.json()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                    })
            })
    }
    freezeUser(){
        let frozenUserIDs = this.state.rowIDs;
        fetch('http://localhost:8080/AdminAction/freezeUsers',
            {
                method: 'POST',
                mode: 'cors',
                body: frozenUserIDs
            }
        )
            .then(response => {
                return response.json()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                    })
            })
    }
    activateUser(){
        let activatedUserIDs = this.state.rowIDs;
        fetch('http://localhost:8080/AdminAction/activateUsers',
            {
                method: 'POST',
                mode: 'cors',
                body: activatedUserIDs
            }
        )
            .then(response => {
                return response.json()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                    })
            })
    }

    onRowSelect=(row)=>{
        let tmp = this.state.rowIDs;
        let rowID = row.id;
        alert("The selected rowID is: " + rowID);
        for( let i = 0; i < tmp.length; i++)
        {
            if(tmp[i]===rowID)
            {
                return;
            }
        }
        tmp.append("UserID", rowID);
        this.setState({
            rowIDs: tmp
        });
        alert("Now you have selected rows: " + this.state.rowIDs);
    };

    render()
    {
        const options = {
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange,
        };
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect,
        };

        const cellEdit = {
            mode: 'click', // click cell to edit
            blurToSave: true,
        };
        return(
            <div>
                <br/>
                <BootstrapTable data={ this.state.userData} height="300px" keyBoardNav
                                columnFilter
                                selectRow={ selectRowProp }
                                cellEdit={ cellEdit }
                                options={ options }>
                    <TableHeaderColumn dataField='id' isKey={true} dataSort={ true }>
                        UserID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>UserName</TableHeaderColumn>
                    <TableHeaderColumn dataField='pwd'>Password</TableHeaderColumn>
                    <TableHeaderColumn dataField='email'>E-mail</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone'>PhoneNUM</TableHeaderColumn>
                    <TableHeaderColumn dataField='valid'>Valid</TableHeaderColumn>
                </BootstrapTable >
                <br/>
                <ButtonToolbar>
                    <Col md={2}>
                        <Button bsStyle="info" onClick={this.showUser}>Show User Info</Button>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="warning" onClick={this.deleteUser}>Delete User</Button>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="danger" onClick={this.freezeUser}>Freeze User</Button>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="success" onClick={this.activateUser}>Activate User</Button>
                    </Col>
                </ButtonToolbar>
                <div className="modal-container" style={{height: 200}}>
                    <Modal show={this.state.show} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>对话框标题</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={this.state.img} alt="" height="500" width="570"/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>取消</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default UserManager;