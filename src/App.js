import React from 'react';
import './App.css';
import './VaccinationTable';
import {useState, useEffect} from 'react';


function App() {

  const api = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json';

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(api)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])


  return (
    <div className="App">

    </div>
  );
}

export default App;
