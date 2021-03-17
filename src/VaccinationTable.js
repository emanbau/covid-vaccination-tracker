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
    table: {
      minWidth: 650,
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

    // Filter through data to find most recent numbers
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
        
      })

      console.log(rows);

    return (
        <div className='table'>

        </div>
    )
}

export default VaccinationTable
