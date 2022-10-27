import './css/styles.css';
import fetch from './fetchCountries';
import DEBOUNCE from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('input'),
  list: document.querySelector('ul'),
  contaiter: document.querySelector('div'),
};

refs.input.addEventListener('input', DEBOUNCE(searchInput, 300));

function searchInput(e) {
  const word = e.target.value.trim();
  if (word === '') {
    refs.contaiter.innerHTML = '';
    refs.list.innerHTML = '';
    return;
  }

  fetch.fetchCountries(word).then(fetchResolve).catch(fetchError);
}

function fetchResolve(country) {
  const addCountries = country.map(markupCountries).join('');
  refs.list.innerHTML = addCountries;
  const addCountry = country.map(markupCountry).join('');
  refs.contaiter.innerHTML = addCountry;
  searchCountry(country);
  console.log(country);
}
function fetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function markupCountries(countries) {
  const { name, flags } = countries;
  return `
  <li class='countries-item'><img src =${flags.png} width = '30' height = '20'> ${name.official}</li>`;
}

function markupCountry(country) {
  const { name, flags, capital, population, languages } = country;
  return `<h1 class='hero-tittle'><img width = '50' height = '35px' src='${
    flags.svg
  }'> ${
    name.official
  }</h1><p><b>Capital:</b> ${capital}</p><p><b>Population:</b> ${population}</p><p><b>Languages:</b> ${Object.values(
    languages
  )}</p>`;
}

function searchCountry(country) {
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
