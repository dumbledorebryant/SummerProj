import React from 'react'
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import {Button, ButtonToolbar, Col, Modal} from "react-bootstrap";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';

const styles = theme => ({
    header: {
        width: '100%',
        maxWidth: 360,
    },
});

class UserManager extends React.Component
{
    constructor() {
        super();
        this.state = {
            rowIDs: [],
            userData: [],
            userSum:0,

            sortName: undefined,
            sortOrder: undefined,
        };
        this.onRowSelect = this.onRowSelect.bind(this);
        this.showUser = this.showUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.freezeUser = this.freezeUser.bind(this);
        this.activateUser = this.activateUser.bind(this);
        this.showUser();
    }

    showUser(){
        let tmp = [];
        fetch('http://localhost:8080/Admin/showUsers',
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                return response.json()
                    .then(result => {
                        for (let i = 1; i < result.length; i++) {
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
                            userSum: result[0],
                            userData: tmp
                        });
                    })
            })
    }

    deleteUser(){
        let formData=new FormData();
        formData.append("UserID",this.state.rowIDs);
        fetch('http://localhost:8080/Admin/deleteUsers',
            {
                method: 'POST',
                mode: 'cors',
                body:  formData
            }
        )
            .then(response => {
                return response.text()
                    .then(result => {
                        alert(result);
                        this.showUser();
                    })
            })
    }

    freezeUser(){
        let formData=new FormData();
        formData.append("UserID",this.state.rowIDs);
        fetch('http://localhost:8080/Admin/freezeUsers',
            {
                method: 'POST',
                mode: 'cors',
                body: formData
            }
        )
            .then(response => {
                return response.text()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                        this.showUser();
                    })
            })
    }
    activateUser(){
        let formData=new FormData();
        formData.append("UserID",this.state.rowIDs);
        fetch('http://localhost:8080/Admin/activateUsers',
            {
                method: 'POST',
                mode: 'cors',
                body: formData
            }
        )
            .then(response => {
                return response.text()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                        this.showUser();
                    })
            })
    }

    onRowSelect=(row)=>{
        let tmp = this.state.rowIDs;
        let index=tmp.indexOf(row.id);
        if(index === -1){
            tmp.push(row.id);
        }
        else{
            tmp.splice(index,1);
        }
        this.setState({
            foodIDs: tmp
        });
    };

    render()
    {
        const { classes } = this.props;
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
                <div className={classes.header}>
                    <List>
                        <ListItem>
                            <Avatar>
                                <PermIdentityIcon />
                            </Avatar>
                            <ListItemText primary={"当前用户总数 : " + this.state.userSum}  />
                        </ListItem>
                    </List>
                </div>
                <br/>
                <BootstrapTable data={ this.state.userData} height="300px" keyBoardNav
                                columnFilter
                                selectRow={ selectRowProp }
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
                        <Button bsStyle="warning" onClick={this.deleteUser}>Delete User</Button>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="danger" onClick={this.freezeUser}>Freeze User</Button>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="success" onClick={this.activateUser}>Activate User</Button>
                    </Col>
                </ButtonToolbar>
            </div>
        )
    }
}

UserManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserManager);