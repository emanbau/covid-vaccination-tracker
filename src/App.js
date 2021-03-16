import React from 'react';
import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import VaccinationTable from './VaccinationTable';


function App() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json')
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, [])


  // Form Handle - Search for country
  const handleChange = event => {
    setSearch(event.target.value);
  }

  // Filtered Search - Returns country that was searched
  const filteredCountry = data.filter(data => 
    data.country.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className="App">
      <div className="countryTable">
        {filteredCountry.map(data => {
          return(
            <VaccinationTable
            country={data['country']}
            data={data['data']}
            iso={data['iso_code']}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
