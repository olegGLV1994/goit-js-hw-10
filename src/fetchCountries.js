function fetchCountries(countryName) {
  return fetch(
    ` https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,capital,population,languages`
  ).then(response => {
    return response.json();
  });
}

export default { fetchCountries };
