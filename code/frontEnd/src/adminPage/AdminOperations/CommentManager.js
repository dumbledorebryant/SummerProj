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

    fetchComment(){
        let tmp = this.state.comments;
        fetch('http://localhost:8080/AdminAction/showComments',
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
                                        "Date": result[i].commentDate,
                                        "Valid": result[i].valid
                                    };
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
        fetch('http://localhost:8080/User/DeleteUsers',
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

    onRowSelect=(row)=>{
        let tmpComments = this.state.commentIDs;
        let commentID = row.commentID;
        for( let i = 0; i < tmpComments.length; i++)
        {
            if(tmpComments[i] === commentID)
            {
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
                    <TableHeaderColumn dataField='UserID'>UserID</TableHeaderColumn>
                    <TableHeaderColumn dataField='WindowID'>WindowID</TableHeaderColumn>
                    <TableHeaderColumn dataField='Content'>Content</TableHeaderColumn>
                    <TableHeaderColumn dataField='Date'>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='Valid'>ValidState</TableHeaderColumn>

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