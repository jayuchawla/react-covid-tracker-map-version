export const countriesAvailableUrl = 'https://disease.sh/v3/covid-19/countries';

export const allCountriesIdentifier = 'worldwide';
export const globalStatsUrl = 'https://disease.sh/v3/covid-19/all';

export const countryWiseUrlGenerator = function(selectedCountry) {
    return `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;
}

export const numberOfDays=120;
export const historicalGlobalStatsUrl = `https://disease.sh/v3/covid-19/historical/all?lastdays=${numberOfDays}`;
export const historicalCountryWiseStatsUrlGenerator = function(countryCode) {
    return `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=${numberOfDays}`;
}