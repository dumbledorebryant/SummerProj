import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';


function createData(id,name, count, restaurant, floor) {
    return { id, name, count, restaurant, floor };
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    { id: 'name', numeric: false, disablePadding: true, label: '窗口名称' },
    { id: 'count', numeric: true, disablePadding: false, label: '浏览次数' },
    { id: 'restaurant', numeric: true, disablePadding: false, label: '所属食堂' },
    { id: 'floor', numeric: true, disablePadding: false, label: '所属楼层' },

];

class ViewHistoryTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };
    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {<h5>{column.label}</h5>}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

ViewHistoryTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let selectData = [];
class ViewHistoryTableToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.clickDelete = this.clickDelete.bind(this);
    }

    clickDelete=()=>{
        fetch("http://localhost:8080/ViewHistory/UpdateViewHistory?"  +
            'userID='+this.props.userid+
            '&deleteID='+selectData,
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        this.props.getViewHistory();
                    })
            })
    };

    render() {
        const {numSelected, classes} = this.props;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="title" id="tableTitle">
                            {<h5>我的浏览记录</h5>}
                        </Typography>
                    )}
                </div>
                <div className={classes.spacer}/>
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete" onClick={this.clickDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon/>
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </Toolbar>
        );
    }
}


ViewHistoryTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

ViewHistoryTableToolbar = withStyles(toolbarStyles)(ViewHistoryTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});


class ViewHistoryTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'desc',
            orderBy: 'count',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 5,

        };
        this.getViewHistory = this.getViewHistory.bind(this);
        this.getViewHistory();
        this.handleClick = this.handleClick.bind(this);
    }

    getViewHistory = () =>{
        fetch("http://localhost:8080/ViewHistory/GetViewHistory?"  +
            'userID='+this.props.userid,
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        let temp = [];
                        for (let i in result) {
                            console.log("tableData:" + result[i].windowId);
                            let add = createData
                            (
                                result[i].windowId,
                                result[i].windowName,
                                result[i].count,
                                result[i].restaurant,
                                result[i].floor
                            );
                            temp.push(add);
                        }
                        this.setState({
                            data: temp
                        });
                    })
            })
    };


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) },()=>{
                selectData=this.state.selected;
                return;
            });
        }
        this.setState({ selected: [] });
    };

    handleClick = name => event => {
        let { selected } = this.state;
        let selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({
            selected: newSelected}, ()=> {
            selectData=this.state.selected;
        });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <Paper className = {classes.root}>
                <ViewHistoryTableToolbar numSelected = {selected.length}
                                         userid = {this.props.userid}
                                         getViewHistory = {this.getViewHistory}/>
                <div className = {classes.tableWrapper}>
                    <Table className = {classes.table} aria-labelledby = "tableTitle">
                        <ViewHistoryTableHead
                            numSelected = {selected.length}
                            order = {order}
                            orderBy = {orderBy}
                            onSelectAllClick = {this.handleSelectAllClick}
                            onRequestSort = {this.handleRequestSort}
                            rowCount = {data.length}
                        />
                        <TableBody>
                            {data
                                .sort(getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick = {this.handleClick(n.id)}
                                            role = "checkbox"
                                            aria-checked = {isSelected}
                                            tabIndex = {-1}
                                            key = {n.id}
                                            selected = {isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked = {isSelected}/>
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.name}
                                            </TableCell>
                                            <TableCell numeric>{n.count}</TableCell>
                                            <TableCell numeric>{n.restaurant}</TableCell>
                                            <TableCell numeric>{n.floor}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

ViewHistoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewHistoryTable);
