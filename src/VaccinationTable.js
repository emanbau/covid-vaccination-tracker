import React from 'react';
import { useState } from 'react';
import './VaccinationTable.css';
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
        width: '100vw',
    },

    searchbar: {
        display: 'block',
        width: '100%',
        marginTop: '2em',
        marginBottom: '2em',
        padding: '15px',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '16px 16px 16px 16px',
        boxShadow: '0px 5px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
        textAlign: 'center',
    },

    tableContainer: {
        minWidth: 300,
        maxWidth: 1000,
        backgroundColor: '#2E2E2E',
        border: '2px solid #525252'
    },

    table: {
        minWidth: 300,
    },

    headCell: {
        paddingLeft: '5em',
        paddingRight: '5em',
        paddingTop: '1.5em',
        paddingBottom: '1.5em',
        color: '#fbfbfb',
        borderColor: "#525252",
    },
    bodyCell: {
        paddingLeft: '5em',
        paddingRight: '5em',
        color: '#fbfbfb',
        borderColor: "#525252",
    },
  });

function createData(country, iso, totalVaccinations) {
    return {country, iso, totalVaccinations};
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
        let iso = data["iso_code"];

        for (let i = data["data"].length - 1; i >= 0; i--) {
            if ("total_vaccinations" in data["data"][i]) {
                total = data["data"][i]["total_vaccinations"];
                break;
            } else {
                total = 'DNE';
            }
        }

        let dataPush = createData(countryName, iso, total);
        rows.push(dataPush);
        
        return null;
      })
    

    return (
        <div className={classes.tableContainerDiv}>
            <form>
                <input className={classes.searchbar} type='text' placeholder='Search Country' onChange={handleChange}/>
            </form>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.headCell}>Country</TableCell>
                            <TableCell className={classes.headCell} align='right'>ISO Code</TableCell>
                            <TableCell className={classes.headCell} align='right'>Total Vaccinations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map( element => {
                        return(
                            <TableRow>
                                <TableCell className={classes.bodyCell}>{element.country}</TableCell>
                                <TableCell className={classes.bodyCell} align='right'>{element.iso}</TableCell>
                                <TableCell className={classes.bodyCell} align='right'>{element.totalVaccinations}</TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default VaccinationTable
