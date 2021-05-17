import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';
import '../styles/mapData.css';

const casesTypeColors = {
    cases: {
        hex: "#499DD0",
        rgb: "rgb(73, 157, 208)",
        half_op: "rgba(73, 157, 208, 0.5)",
        multiplier: 200,
    },
    recovered: {
        hex: "#4FBF26",
        rgb: "rgb(79, 191, 38)",
        half_op: "rgba(79, 191, 38, 0.5)",
        multiplier: 500,
    },
    deaths: {
        hex: "#CD5F66",
        rgb: "rgb(205, 95, 102)",
        half_op: "rgba(205, 95, 102, 0.5)",
        multiplier: 800,
    }
}

// draw circles on map with interactive tooltip
export const showDataOnMap = function(data, casesType='cases') {
    return (
        data.map(function(country) {
            // console.log("logging coordinates: ", country.countryInfo.lat, country.countryInfo.long);
            return (
                <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={casesTypeColors[casesType].hex}
                fillColor={casesTypeColors[casesType].hex}
                radius={
                    Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
                }>
                <Popup className="popup">
                    <div className="info-container">
                        <div className="info-flag" style={{ backgroundImage:`url(${country.countryInfo.flag})` }}></div>
                        <div className="info-name">{country.country}</div>
                        <div className="info-confirmed">Total Cases: {numeral(country.cases).format("0,0")}</div>
                        <div className="info-recovered">Total Recoveries: {numeral(country.recovered).format("0,0")}</div>
                        <div className="info-deaths">Total Deaths: {numeral(country.deaths).format("0,0")}</div>
                    </div>
                </Popup>
            </Circle>
            )
        })
    );
}