import React from 'react';
import './ChoroplethMap';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    tableContainerDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '95vh',
    },

    searchbar: {
        display: 'block',
        minWidth: 300,
        maxWidth: 500,
        marginTop: '2em',
        marginBottom: '2em',
        padding: '10px',
        borderRadius: '16px 16px 16px 16px',
        fontSize: '15px',
        border: '.5px solid black',
        textAlign: 'center',
        outline: 'none',
    },

    tableContainer: {
        minWidth: '33vw',
        maxWidth: '100vw',
        maxHeight: '80vh',
    },

    table: {
        minWidth: '33vw',
    },

    headCell: {
        paddingLeft: '3em',
        paddingRight: '3em',
        paddingTop: '1.5em',
        paddingBottom: '1.5em',
        backgroundColor: '#fafafa',
    },
    bodyCell: {
        paddingLeft: '3em',
        paddingRight: '3em',
    },
  });

function DataTable({rows, handleChange}) {

    const classes = useStyles();

    return (
        <div className={classes.tableContainerDiv}>
                <form>
                    <input className={classes.searchbar} type='text' placeholder='Search Country' onChange={handleChange}/>
                </form>
                <Paper elevation={9}>
                    <TableContainer className={classes.tableContainer}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.headCell}>Country</TableCell>
                                    <TableCell className={classes.headCell} align='left'>Total Vaccinations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map( element => {
                                return(
                                    <TableRow>
                                        <TableCell className={classes.bodyCell}>{element.country}</TableCell>
                                        <TableCell className={classes.bodyCell} align='left'>{element.totalVaccinations}</TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
    )
}

export default DataTable
