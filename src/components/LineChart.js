import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { allCountriesIdentifier, historicalCountryWiseStatsUrlGenerator, historicalGlobalStatsUrl } from '../util/urls';
import { lineChartOptions } from '../util/plotOptions';

function LineChart({ countryCode, type, borderColor, title, ...props }) {

    const [dataToPlot, setDataToPlot] = useState([])
    const urlToFetch = countryCode === allCountriesIdentifier ? historicalGlobalStatsUrl : historicalCountryWiseStatsUrlGenerator(countryCode);

    const buildChartData = function (d, casesType = 'cases') {
        let chartData = []
        let lastDataPoint;
        const caseSpecificData = d[casesType];
        Object.keys(caseSpecificData).forEach(function (date) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: d[casesType][date] - lastDataPoint
                }
                chartData = [...chartData, newDataPoint]
            }
            lastDataPoint = d[casesType][date]
        });
        return chartData;
    }


    useEffect(function() {
        setDataToPlot([])
        console.log("url to fetch data for: ", countryCode, " is: ", urlToFetch);    
        axios.get(urlToFetch)
            .then(function(response) {
                const dataFetched = countryCode === allCountriesIdentifier ? response.data : response.data.timeline;
                if(dataFetched){
                    return dataFetched;
                }
                return null;
            }).then(function(d) {
                if(d) {
                    console.log("data fetched for: ", countryCode, " is: ", d);
                    return buildChartData(d, type);
                }
                return null;
            }).then(function(refined_data) {
                if (refined_data) {
                    console.log("refined data for ", countryCode, " type: ", type, " is: ", refined_data);
                    setDataToPlot(refined_data);
                }
            }).catch(function(error) {
                console.log(error);
            })
    }, [urlToFetch, type])

    
    return (
        <div className={props.className}>
            {
                dataToPlot ? 
                    <Line
                    options={lineChartOptions}
                    data={{
                        datasets: [
                            {
                                label: `${title}`,
                                fill: true,
                                backgroundColor: 'rgba(255, 255, 2555, 0.6)',
                                borderColor: `${borderColor}`,
                                data: dataToPlot,
                            },
                        ]
                    }}
                /> : null
            }
        </div>
    )
}

export default LineChart;
