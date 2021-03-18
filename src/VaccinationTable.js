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
    tableContainer: {
        minWidth: 650,
        maxWidth: 1000,
    },

    table: {
        minWidth: 650,
    },

    headCell: {
        paddingLeft: '5em',
        paddingRight: '5em',
        paddingTop: '2em',
        paddingBottom: '2em',
    },
    bodyCell: {
        paddingLeft: '5em',
        paddingRight: '5em',
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
    }

    // Filtered Search - Returns country that was searched
    const filteredCountry = data.filter(data => 
        data.country.toLowerCase().includes(search.toLowerCase())
    )

    // Filters through data to find most recent numbers & pushes data into row
    filteredCountry.map(data => {
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

      console.log(rows);

    return (
        <div className='table'>
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
