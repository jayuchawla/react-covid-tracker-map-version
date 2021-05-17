import React from 'react';
import numeral from 'numeral';

import '../styles/table.css';

function Table({ countries }) {
    return (
        <div className="table">
            <h4>Live Cases by Country</h4>
            {
                countries.map(function({country, cases, countryInfo}){
                    return(
                        <tr key={countryInfo.iso2}>
                            <td>{country}</td>
                            <td>
                                <strong>{numeral(cases).format("0,0")}</strong>
                            </td>
                        </tr>
                    )
                })
            }
        </div>
    )
}

export default Table;
