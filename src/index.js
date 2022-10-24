import './css/styles.css';
import VALUE from './fetchCountries';
import DEBOUNCE from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('input'),
  list: document.querySelector('ul'),
  contaiter: document.querySelector('div'),
};

refs.input.addEventListener('input', DEBOUNCE(onInput, 300));

function onInput(e) {
  const value = e.target.value.trim();

  if (value === '') {
    refs.contaiter.innerHTML = '';
    refs.list.innerHTML = '';
    return;
  }

  VALUE.fetchCountries(value).then(onFetchCountries).catch(onFetchError);
}

function onFetchCountries(country) {
  const addlistCountry = country.map(countriesList).join('');
  refs.list.innerHTML = addlistCountry;
  const addInfoCountry = country.map(onCountry).join('');
  refs.contaiter.innerHTML = addInfoCountry;
  searchCounty(country);
  console.log(country);
}
function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function countriesList(addcountries) {
  const { name, flags } = addcountries;
  return `
  <li><img src =${flags.png} width = '20' height = '15'> ${name.official}</li>`;
}

function onCountry(addcountry) {
  const { name, flags, capital, population, languages } = addcountry;
  return `<h1><img width = '50' src='${flags.svg}'> ${
    name.official
  }</h1><p><b>Capital:</b> ${capital}</p><p><b>Population:</b> ${population}</p><p><b>Languages:</b> ${Object.values(
    languages
  )}</p>`;
}

function searchCounty(country) {
  if (country.length > 10) {
    refs.contaiter.innerHTML = '';
    refs.list.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (country.length >= 2 && country.length < 10) {
    refs.contaiter.innerHTML = '';
  } else {
    refs.list.innerHTML = '';
  }
}
