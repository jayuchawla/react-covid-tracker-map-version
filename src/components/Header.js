import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import '../styles/header.css';

function Header(props) {

    const onSelectedCountryChange = props.onSelectedCountryChange;
    const selectedCountry = props.selectedCountry;
    const countries = props.countries;
    
    return (
        <div className='header'>
            <div className="header__title">Covid-19 tracker</div>
            <FormControl className="app__dropdown">
                <Select variant="outlined" value={selectedCountry} onChange={onSelectedCountryChange}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {
                        countries.map(function (country) {
                            return (
                                <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default Header;
