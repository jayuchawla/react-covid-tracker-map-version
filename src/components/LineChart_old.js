import React, { useState, useEffect } from 'react'
import { allCountriesIdentifier, historicalGlobalStatsUrl, historicalCountryWiseStatsUrlGenerator } from '../util/urls';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function(value, index, values) {
                        return numeral(value).format("0a")
                    },
                },
            },
        ],
    },
}


function LineChart({countryCode, type}) {
    const [dataInArrayFormat, setdataInArrayFormat] = useState([])
    const [fetched, setFetched] = useState(false)
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
        console.log(countryCode, chartData);
        return chartData;
    }

    useEffect(function () {
        axios.get(urlToFetch)
        .then(function (response) {
            const chartData = buildChartData(response.data, type);
            return chartData;
        }).then(function(d) {
            setdataInArrayFormat(d);
        }).then((d) => {
            console.log("data fetched for ", countryCode, ": ", dataInArrayFormat);
        }).catch(function (error) {
            console.log(error);
        })
    }, [countryCode]);

    // useEffect(function () {
    //     if(!fetched) {
    //         axios.get(urlToFetch)
    //         .then(function (response) {
    //             const chartData = buildChartData(response.data, type);
    //             return chartData;
    //         }).then(function(d) {
    //             setdataInArrayFormat(d);
    //             setFetched(true);
    //         }).catch(function (error) {
    //             console.log(error);
    //         })
    //     }
    // }, [dataInArrayFormat]);


    return (
        <div>
            <Line
                options={options}
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            borderColor: "#CC1034",
                            data: dataInArrayFormat
                        }
                    ]
                }}
            // options
            />
        </div>
    )
}

export default LineChart
