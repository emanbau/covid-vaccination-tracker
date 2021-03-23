import React from 'react';
import { useState } from 'react';
import DataTable from './DataTable';
import ChoroplethMap from './ChoroplethMap';


function createData(country, totalVaccinations) {
    return {country, totalVaccinations};
}

let rows = []

function VaccinationTable({ data }) {

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


    return (
        <div>
            <ChoroplethMap filteredData={rows}/>
            <DataTable rows={rows} handleChange={handleChange}/>
        </div>
    )
}

export default VaccinationTable
