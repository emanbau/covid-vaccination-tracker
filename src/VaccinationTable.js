import React from 'react';
import './VaccinationTable.css';

function VaccinationTable({country, data}) {

    // Filter through data to find most recent numbers
    let total;

    for (let i = data.length - 1; i >= 0; i--) {
        if ("total_vaccinations" in data[i]) {
            total = data[i]["total_vaccinations"];
            break;
        } else {
            total = 'DNE'
        }
    }
    
    console.log(total);
    return (
        <div className='tableContainer'>
            
        </div>
    )
}

export default VaccinationTable
