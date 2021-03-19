import React from 'react';
import { useState } from 'react';
import './VaccinationTable.css';
import './ChoroplethMap';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ChoroplethMap from './ChoroplethMap';

const useStyles = makeStyles({
    tableContainerDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
    },

    searchbar: {
        display: 'block',
        width: '100%',
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
        minWidth: 300,
        maxWidth: 500,
    },

    table: {
        minWidth: 300,
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

function createData(country, totalVaccinations) {
    return {country, totalVaccinations};
}

let rows = []

function VaccinationTable({ data }) {

    const classes = useStyles();

    const [search, setSearch] = useState('');

    // Form Handle - Search for country
    const handleChange = event => {
        setSearch(event.target.value);
        rows = [];
    }

    // Filtered Search - Returns country that was searched
    const filteredCountry = data.filter(data => 
        data.country.toLowerCase().includes(search.toLowerCase())
    )

    // Filters out continent data, finds most recent data, pushes data to table row
    filteredCountry.filter(data => !data['iso_code'].includes("OWID")).map(data => { 
        let total;
        let countryName = data["country"];

        for (let i = data["data"].length - 1; i >= 0; i--) {
            if ("total_vaccinations" in data["data"][i]) {
                total = data["data"][i]["total_vaccinations"];
                break;
            } else {
                total = 'DNE';
            }
        }

        let dataPush = createData(countryName, total);
        rows.push(dataPush);

        return null;
      })

    console.log(rows);

    return (
        <div>
            <ChoroplethMap filteredData={rows}/>
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
        </div>
    )
}

export default VaccinationTable
