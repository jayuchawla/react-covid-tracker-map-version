import { useState, useEffect } from 'react';
import './styles/App.css';
import axios from 'axios';

import { countriesAvailableUrl, allCountriesIdentifier, globalStatsUrl, countryWiseUrlGenerator } from './util/urls';

import Header from './components/Header';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineChart from './components/LineChart';

import { Card, CardContent } from '@material-ui/core';

import sortData from './util/sortData';
import { prettyPrintStat } from './util/prettyPrintStat';

import "leaflet/dist/leaflet.css";
import numeral from 'numeral';

function App() {
  // only stores name of country & iso2 codes
  const [countries, setCountries] = useState([])
  // only stores iso2 of selected country which is accessed as value of select drop down
  const [selectedCountry, setSelectedCountry] = useState(allCountriesIdentifier)
  // only stores cases, recovered, deaths of selected country
  const [selectedCountryStats, setSelectedCountryStats] = useState({})
  // has countries data sorted wrt num of cases
  const [tableData, setTableData] = useState([])  
  const [mapCenter, setMapCenter] = useState({ lat:34.80746, lng:-40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapData, setMapData] = useState([])
  const [casesType, setCasesType] = useState('cases')
  
  const urlToFetch = selectedCountry === allCountriesIdentifier ? globalStatsUrl : countryWiseUrlGenerator(selectedCountry);
  
  useEffect(() => {
    axios.get(countriesAvailableUrl)
      .then(function (response) {
        return response;
      }).then(function (response){
        const countriesFetched = response.data.map(function (country) {
          return ({
            name: country.country,
            value: country.countryInfo.iso2
          })
        })      
        setCountries(countriesFetched);
        const sortedAccordingToCases = sortData(response.data);
        setTableData(sortedAccordingToCases);
        setMapData(response.data);
      }).catch(function (error) {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    axios.get(urlToFetch)
      .then(function (response) {
        setSelectedCountryStats(response.data);
        setMapCenter([response.data.countryInfo.lat, response.data.countryInfo.long]);
        setMapZoom(4);
      }).catch(function (error) {
        console.log(error);
      })
  }, [selectedCountry])

  const onSelectedCountryChange = async function (e) {
    const selectedCountryCode = e.target.value;
    setSelectedCountry(selectedCountryCode);
  }

  return (
    <div className="app"> {/*BEM naming convention*/}

      <div className="app__left">
        {/* Header */}
        {/* Title and dropdown */}
        <Header onSelectedCountryChange={onSelectedCountryChange} selectedCountry={selectedCountry} countries={countries} />

        {/* Active cases info */}
        {/* Recovered cases info */}
        {/* Deaths info */}
        <div className="stats">
          <InfoBox
            title="Active"
            cases={prettyPrintStat(selectedCountryStats.todayCases)}
            total={numeral(selectedCountryStats.active).format("0.0a")}
            identifierColor="rgba(73, 157, 208, 0.6)"
            onClick={(e) => setCasesType('cases')}
            active={casesType === "cases"}
          />
          <InfoBox
            title="Recovered"
            cases={prettyPrintStat(selectedCountryStats.todayRecovered)}
            total={numeral(selectedCountryStats.recovered).format("0.0a")}
            identifierColor="rgba(79, 191, 38, 0.6)"
            onClick={(e) => setCasesType('recovered')}
            active={casesType === "recovered"}
          />
          <InfoBox
            title="Deaths"
            cases={prettyPrintStat(selectedCountryStats.todayDeaths)}
            total={numeral(selectedCountryStats.deaths).format("0.0a")}
            identifierColor="rgba(205, 95, 102, 0.6)"
            onClick={(e) => setCasesType('deaths')}
            active={casesType === "deaths"}
          />
        </div>

        {/* Map */}
        <Map data={mapData} casesType={casesType} center={mapCenter} zoom={mapZoom}/>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            {/* Country Table */}
            <Table countries={tableData}/>
            {/* Graph */}
            <h3>{selectedCountry.toLocaleUpperCase()} new {casesType}</h3>
            <LineChart className="app__graph" countryCode={selectedCountry} type={casesType} borderColor="rgba(73, 157, 208, 0.6)" hoverBorderColor="rgba(73, 157, 208, 1.0)" title='Active'/>
            {/* <LineChart countryCode={selectedCountry} type="recovered" borderColor="rgba(79, 191, 38, 0.6)" hoverBorderColor="rgba(79, 191, 38, 1.0)" title='Recovered'/>
            <LineChart countryCode={selectedCountry} type="deaths" borderColor="rgba(205, 95, 102, 0.6)" hoverBorderColor="rgba(205, 95, 102, 1.0)" title='Deaths'/> */}
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}

export default App;
