import React from 'react'
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {Button, ButtonToolbar, Col, ControlLabel, Form,
    FormControl, FormGroup, Modal,Row} from "react-bootstrap";
import UploadNewFoodPic from "./UploadNewFoodPic";
import Paper from "@material-ui/core/es/Paper/Paper";
import Chip from "@material-ui/core/es/Chip/Chip";
import SettingsIcon from '@material-ui/icons/Settings';
import blue from "@material-ui/core/es/colors/blue";
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = theme => ({
    header: {
        width: '100%',
        maxWidth: 360,
    },
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit ,
    },
    chip: {
        margin: theme.spacing.unit ,
    },
    icon:{
        color:blue[500]
    },
    iconRestaurant:{
        margin: theme.spacing.unit,
        marginLeft:theme.spacing.unit,
    },
    tagTitle:{
        marginLeft:theme.spacing.unit
    }
});

const tagsInit=[[]];
class MenuManager extends React.Component {
    constructor() {
        super();
        this.state = {
            windowID: -1,
            name: "",
            price: "",
            tips: "",
            sortName: undefined,
            sortOrder: undefined,
            date: "",
            newData: [],
            singleWindow: [],
            show: false,
            img: '',
            foodData: [],
            foodIDs: [],
            newFoodId: '',
            allTags: tagsInit,
            tagBool: [],
            header: [],
            file: null,
            selected:[]
        };
        this.addNewDish = this.addNewDish.bind(this);
        this.close = this.close.bind(this);
        this.fetchInfo = this.fetchInfo.bind(this);
        this.registerInfo = this.registerInfo.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onRowSelectFood = this.onRowSelectFood.bind(this);
        this.addExistedFood = this.addExistedFood.bind(this);
        this.ChangeFoodName = this.ChangeFoodName.bind(this);
        this.ChangePrice = this.ChangePrice.bind(this);
        this.ChangeTips = this.ChangeTips.bind(this);
        this.showTags = this.showTags.bind(this);
        this.handleClickTag = this.handleClickTag.bind(this);
        this.setFile = this.setFile.bind(this);
    }

    handleClickTag = data => () => {
        let temp = this.state.tagBool;
        temp[data.key] = !temp[data.key];
        this.setState({
            tagBool: temp
        });
    };

    showTags() {
        fetch('http://localhost:8080/Tag/ShowTags',
            {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                return response.json()
                    .then(result => {
                        let tagDataGroup = [];
                        let tagBoolTemp = [];
                        for (let k = 0; k < 3; k++) {
                            tagDataGroup[k] = [];
                        }
                        let headerTemp = [];
                        headerTemp.push("taste");
                        headerTemp.push("country");
                        headerTemp.push("food");
                        for (let i in result) {
                            let add = {
                                "key": result[i].tagId,
                                "label": result[i].tagName,
                                "tagType": result[i].tagType
                            };
                            tagBoolTemp[result[i].tagId] = false;
                            if (result[i].tagType === "taste") {
                                tagDataGroup[0].push(add);
                            }
                            if (result[i].tagType === "country") {
                                tagDataGroup[1].push(add);
                            }
                            if (result[i].tagType === "food") {
                                tagDataGroup[2].push(add);
                            }
                        }
                        this.setState({
                            allTags: tagDataGroup,
                            tagBool: tagBoolTemp,
                            header: headerTemp
                        })
                    })
            })
    }


    addExistedFood() {
        let formData = new FormData();
        if (this.state.foodIDs.length === 0) {
            return;
        }
        formData.append("ExistedFood", this.state.foodIDs);
        formData.append("windowID", this.state.windowID);
        fetch('http://localhost:8080/Admin/AddTodayFood/ExistedFood',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: formData,
            }
        )
            .then(response => {
                return response.text()
                    .then(result => {
                        alert(result);
                    })
            })
    }

    addNewDish() {
        let tagChoose = [];
        for (let i in this.state.tagBool) {
            if (this.state.tagBool[i] === true) {
                tagChoose.push(i);
            }
        }
        let formData = new FormData();
        if (this.state.name === '' || this.state.price === '') {
            alert("Information Loss!");
            return;
        }
        formData.append("windowID", this.state.windowID);
        formData.append("foodName", this.state.name);
        formData.append("foodPrice", this.state.price);
        formData.append("foodTip", this.state.tips);
        formData.append("tags", tagChoose);
        fetch('http://localhost:8080/Admin/AddTodayFood/NewFood',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: formData,
            }
        )
            .then(response => {
                return response.text()
                    .then(result => {
                        let tagBoolTemp=this.state.tagBool;
                        for(let i in result){
                            if(tagBoolTemp[i]===true){
                                tagBoolTemp[i]=false;
                            }
                        }
                        this.setState({
                            newFoodId: result,
                            name:'',
                            price:'',
                            tips:'',
                            tagBool:tagBoolTemp
                        });
                        let formData = new FormData();
                        formData.append('files[]', this.state.file);
                        formData.append('foodID', result);
                        fetch('http://localhost:8080/Admin/UploadNewFoodPic?' ,
                            {
                                method: 'POST',
                                mode: 'cors',
                                body:formData
                            }
                        )
                            .then(response => {
                                response.text()
                                    .then(result => {
                                        //alert(result);
                                    });
                            });
                        alert("success");
                        this.registerInfo();
                    })
            })
    }

    onRowSelectFood = (row) => {
        let tmp = this.state.foodIDs;
        let tmp2=this.state.selected;
        if(tmp2===''){
            tmp2=[]
        }

        let index = tmp.indexOf(row.id);
        if (index === -1) {
            tmp.push(row.id);
        }
        else {
            tmp.splice(index, 1);
        }

        let index2 = tmp2.indexOf(row.id);
        if (index2 === -1) {
            tmp2.push(row.id);
        }
        else {
            tmp2.splice(index2, 1);
        }

        this.setState({
            foodIDs:tmp,
            selected:tmp2
        });
    };

    ChangeFoodName(event) {
        this.setState({
            name: event.target.value
        })
    }

    ChangePrice(event) {
        this.setState({
            price: event.target.value
        })
    }

    ChangeTips(event) {
        this.setState({
            tips: event.target.value
        })
    }

    close() {
        this.setState({
            show: false
        })
    }

    componentDidMount(){
        this.fetchInfo();
    }
    fetchInfo() {
        let tmp = this.state.newData;
        fetch('http://localhost:8080/Admin/ShowNews',
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response => {
                return response.json()
                    .then(result => {
                        tmp.splice(0, tmp.length);
                        if (result.length === 0) {
                            this.setState({
                                newData: []
                            });
                            return;
                        }
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

    registerInfo() {
        if (this.state.windowID === -1) {
            alert("Please choose window first!");
            return;
        }
            let tmpAll = [];
            fetch('http://localhost:8080/Admin/checkWindow' +
                '?windowID=' + this.state.windowID,
                {
                    method: 'GET',
                    mode: 'cors',
                }
            )
                .then(response => {
                    return response.json()
                        .then(result => {
                            let selectedRow=[];
                            let foodIDsTemp=[];
                            for (let i in result) {
                                let single = {
                                    "id": result[i].foodId,
                                    "name": result[i].foodName
                                };
                                tmpAll.push(single);
                                if(result[i].flag===1){
                                    selectedRow.push(result[i].foodId);
                                    foodIDsTemp.push(result[i].foodId);
                                }
                            }
                            if(selectedRow.length===0){
                                selectedRow='';
                            }
                            this.setState({
                                singleWindow: tmpAll,
                                selected:selectedRow,
                                foodIDs:foodIDsTemp
                            });

                            this.showTags();
                            fetch('http://localhost:8080/Admin/fetchWindowPic' +
                                '?windowID=' + this.state.windowID,
                                {
                                    method: 'GET',
                                    mode: 'cors',
                                }
                            )
                                .then(response => {
                                    const blob = response.blob();
                                    return blob
                                        .then(blob => {
                                            console.log("result: ", blob);
                                            let reader = new FileReader();
                                            reader.readAsDataURL(blob);
                                            reader.onload = () => {
                                                this.setState({
                                                    img: reader.result
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


        onRowSelect = (row) => {
            let rowID = row.id;
            this.setState({
                windowID: rowID
            });
        };

        setFile(file){
            this.setState({file:file});
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

            const selectRowPropFood = {
                mode: 'checkbox',
                onSelect: this.onRowSelectFood,
                selected:this.state.selected
            };

            const cellEdit = {
                mode: 'click', // click cell to edit
                blurToSave: true,
            };
            const {classes} = this.props;
            return (
                <div>
                    <br/>
                    <BootstrapTable data={this.state.newData} height="300px" keyBoardNav
                                    columnFilter
                                    selectRow={selectRowProp}
                                    cellEdit={cellEdit}
                                    options={options}>
                        <TableHeaderColumn dataField='id' isKey={true} dataSort={true}>
                            WindowID
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='restaurant'>Restaurant</TableHeaderColumn>
                        <TableHeaderColumn dataField='floor'>Floor</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Window Name</TableHeaderColumn>
                    </BootstrapTable>
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
                                <Modal.Title>WindowID: {this.state.windowID}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col md={5}>
                                        <img src={this.state.img} alt="" height="300px" width="300px"/>
                                    </Col>
                                    <Col md={1}/>
                                    <Col md={6}>
                                        <BootstrapTable data={this.state.singleWindow} height="300px" keyBoardNav
                                                        selectRow={selectRowPropFood}
                                                        cellEdit={cellEdit}
                                                        options={options}>
                                            <TableHeaderColumn dataField='id' isKey={true} dataSort={true}>
                                                FoodID
                                            </TableHeaderColumn>
                                            <TableHeaderColumn dataField='name'>Food Name</TableHeaderColumn>
                                        </BootstrapTable>
                                    </Col>
                                </Row>
                                <br/>
                                <div align="center">
                                    <Button onClick={this.addExistedFood}>
                                        Add The Chosen Food
                                    </Button>
                                </div>

                                <Form>
                                    <FormGroup validationState="warning">
                                        <ControlLabel>Food Name</ControlLabel>
                                        <FormControl placeholder="必填"
                                                     type="text"
                                                     onChange={this.ChangeFoodName}
                                                     value={this.state.name}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                    <FormGroup validationState="success">
                                        <ControlLabel>Food Prices</ControlLabel>
                                        <FormControl placeholder="必填"
                                                     type="text"
                                                     onChange={this.ChangePrice}
                                                     value={this.state.price}/>
                                        <FormControl.Feedback/>
                                        <FormGroup validationState="success">
                                            <ControlLabel>Food Tips</ControlLabel>
                                            <FormControl placeholder="选填"
                                                         type="text"
                                                         onChange={this.ChangeTips}
                                                         value={this.state.tips}/>
                                            <FormControl.Feedback/>
                                        </FormGroup>
                                    </FormGroup>
                                </Form>

                                {this.state.allTags.map(item => {
                                    return (
                                        <div>
                                            <Paper className={classes.root}>
                                                <div className={classes.iconRestaurant}>
                                                    <SettingsIcon/>
                                                    <typography className={classes.tagTitle}>
                                                        {this.state.header[this.state.allTags.indexOf(item)] + " tag setting"}
                                                    </typography>
                                                </div>
                                                {item.map(data => {
                                                    return (
                                                        <Chip
                                                            key={data.key}
                                                            label={data.label}
                                                            onDelete={this.handleClickTag(data)}
                                                            className={classes.chip}
                                                            deleteIcon={this.state.tagBool[data.key]
                                                                ? <CheckCircleIcon className={classes.icon}/>
                                                                : <CheckCircleIcon/>}
                                                        />
                                                    );
                                                }, this)}
                                            </Paper>
                                        </div>
                                    );
                                }, this)}
                                <br/>
                                <UploadNewFoodPic foodId={this.state.newFoodId} setFile={this.setFile}/>
                                <div align="center">
                                    <Button onClick={this.addNewDish}>
                                        Add New Dish
                                    </Button>
                                </div>
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


MenuManager.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MenuManager);
