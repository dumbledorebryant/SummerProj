import React from 'react'
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import {Button, ButtonToolbar, Col} from "react-bootstrap";

const commentData = [{"userID":1, "windowID":1, "content":"something", "date":"xx-xx-xx"},
    {"userID":2, "windowID":2, "content":"something", "date":"xx-xx-xx"},
    {"userID":3, "windowID":3, "content":"something", "date":"xx-xx-xx"}];
class CommentManager extends React.Component
{
    constructor() {
        super();
        this.state = {
            commentIDs: [],
            comments: commentData,

            sortName: undefined,
            sortOrder: undefined
        };
        this.onRowSelect = this.onRowSelect.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
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
                    <TableHeaderColumn dataField='commentID' isKey={true} dataSort={ true }>
                        CommentID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='userID'>UserID</TableHeaderColumn>
                    <TableHeaderColumn dataField='windowID'>WindowID</TableHeaderColumn>
                    <TableHeaderColumn dataField='content'>Content</TableHeaderColumn>
                    <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
                </BootstrapTable >
                <br/>
                <ButtonToolbar>
                    <Col md={2}>
                        <Button bsStyle="warning" onClick={this.deleteComment}>Delete Comment</Button>
                    </Col>
                </ButtonToolbar>
            </div>
        )
    }
}
export default CommentManager;