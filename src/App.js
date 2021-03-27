import React from 'react';
import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import InformationTab from './Components/InformationTab';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9a67ea" 
    },
    secondary: {
      main: "#ffcc80" 
    }
  },
});

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
      <ThemeProvider theme={theme}>
        <InformationTab
          data={data}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
