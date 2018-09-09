import React from 'react'
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import {Button, ButtonToolbar, Col} from "react-bootstrap";

class CommentManager extends React.Component
{
    constructor() {
        super();
        this.state = {
            commentIDs: [],
            comments: [],

            sortName: undefined,
            sortOrder: undefined
        };
        this.onRowSelect = this.onRowSelect.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.fetchComment = this.fetchComment.bind(this);
    }

    componentDidMount(){
        this.fetchComment();
    }

    fetchComment(){
        let tmp = this.state.comments;
        fetch('http://localhost:8080/Admin/showComments',
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
                            if (result.hasOwnProperty(i))
                            {
                                let add =
                                    {
                                        "CommentID": result[i].commentId,
                                        "UserID": result[i].userId,
                                        "WindowID": result[i].windowId,
                                        "Content": result[i].commentContent,
                                        "Valid": result[i].valid
                                    };
                                add["Month"] = result[i].commentDate.month;
                                add["Day"] = result[i].commentDate.day;
                                add["Hour"] = result[i].commentDate.hours;
                                add["Minute"] = result[i].commentDate.minutes;
                                add["Second"] = result[i].commentDate.seconds;

                                tmp.push(add);
                            }
                        }
                        this.setState({
                            comments: tmp
                        });
                    })
            })
    }

    deleteComment(){
        let tmp = this.state.commentIDs;
        let deletedUserIDs = new FormData();
        deletedUserIDs.append("deletedCommentIDs", tmp);
        fetch('http://localhost:8080/Admin/deleteComments',
            {
                method: 'POST',
                mode: 'cors',
                body: deletedUserIDs
            }
        )
            .then(response => {
                return response.text()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                        tmp = [];
                        fetch('http://localhost:8080/Admin/showComments',
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
                                            if (result.hasOwnProperty(i))
                                            {
                                                let add =
                                                    {
                                                        "CommentID": result[i].commentId,
                                                        "UserID": result[i].userId,
                                                        "WindowID": result[i].windowId,
                                                        "Content": result[i].commentContent,
                                                        "Valid": result[i].valid
                                                    };
                                                add["Month"] = result[i].commentDate.month;
                                                add["Day"] = result[i].commentDate.day;
                                                add["Hour"] = result[i].commentDate.hours;
                                                add["Minute"] = result[i].commentDate.minutes;
                                                add["Second"] = result[i].commentDate.seconds;

                                                tmp.push(add);
                                            }
                                        }
                                        this.setState({
                                            comments: tmp
                                        });
                                    })
                            })
                    })
            })
    }

    onRowSelect=(row)=>{
        let tmpComments = this.state.commentIDs;
        let commentID = row.CommentID;
        console.log(commentID);
        console.log(tmpComments);
        for( let i = 0; i < tmpComments.length; i++)
        {
            if(tmpComments[i] === commentID)
            {
                tmpComments.splice(i, 1);
                this.setState({
                    commentIDs: tmpComments
                });
                return;
            }
        }
        tmpComments.push(commentID);
        this.setState({
            commentIDs: tmpComments
        });
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
                <BootstrapTable data={ this.state.comments} height="300px" keyBoardNav
                                columnFilter
                                selectRow={ selectRowProp }
                                cellEdit={ cellEdit }
                                options={ options }>
                    <TableHeaderColumn dataField='CommentID' isKey={true} dataSort={ true }>
                        CommentID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='UserID' dataSort={ true }>UserID</TableHeaderColumn>
                    <TableHeaderColumn dataField='WindowID' dataSort={ true }>WindowID</TableHeaderColumn>
                    <TableHeaderColumn dataField='Content'>Content</TableHeaderColumn>
                    <TableHeaderColumn dataField='Valid'>ValidState</TableHeaderColumn>
                    <TableHeaderColumn dataField='Month' dataSort={ true }>Month</TableHeaderColumn>
                    <TableHeaderColumn dataField='Day' dataSort={ true }>Day</TableHeaderColumn>
                    <TableHeaderColumn dataField='Hour' dataSort={ true }>Hour</TableHeaderColumn>
                    <TableHeaderColumn dataField='Minute' dataSort={ true }>Minute</TableHeaderColumn>
                    <TableHeaderColumn dataField='Second' dataSort={ true }>Second</TableHeaderColumn>
                </BootstrapTable >
                <br/>
                <ButtonToolbar>
                    <Col md={7}/>
                    <Col md={2}>
                        <Button bsStyle="primary" onClick={this.fetchComment}>Fetch Comment</Button>
                    </Col>
                    <Col md={1}>
                        <Button bsStyle="success" onClick={this.deleteComment}>Delete Comment</Button>
                    </Col>
                </ButtonToolbar>
            </div>
        )
    }
}
export default CommentManager;