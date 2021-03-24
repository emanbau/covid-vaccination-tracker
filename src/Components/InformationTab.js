import React from 'react';
import { useState } from 'react';
import DataTable from './DataTable';
import ChoroplethMap from './ChoroplethMap';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from './TabPanel';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles({
    paper: {
        flexGrow: 1,
    },

    tabs: {
        height: '5vh',
    },

    
});

function idCreate(index) {
    return {
        id:`tab-${index}`,
        'aria-controls': `tabpanel-${index}`
    }
}

function createData(country, totalVaccinations) {
    return {country, totalVaccinations};
}

let rows = []

function InformationTab({ data }) {

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

    // Tab Value State
    const [value, setValue] = useState(0);
    const onClick = (event, newValue) => {
        setValue(newValue);
    }

    const classes = useStyles();


    return (
        <div>
            <Paper className={classes.paper}>
                <Tabs centered className={classes.tabs} indicatorColor='primary' value={value} onChange={onClick}>
                    <Tab label='Map' {...idCreate(0)}/>
                    <Tab label='Table' {...idCreate(1)}/>
                </Tabs>
            </Paper>
            <TabPanel index={0} value={value}>
                <ChoroplethMap filteredData={rows}/>
            </TabPanel>
            <TabPanel index={1} value={value}>                
                <DataTable rows={rows} handleChange={handleChange}/>
            </TabPanel>
        </div>
    )
}

export default InformationTab
