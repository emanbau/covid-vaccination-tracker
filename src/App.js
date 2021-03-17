import React from 'react';
import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import VaccinationTable from './VaccinationTable';


function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json')
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, [])


  return (
    <div className="App">
      <div className="countryTable">
      <VaccinationTable
        data={data}
        />
      </div>
    </div>
  );
}

export default App;
