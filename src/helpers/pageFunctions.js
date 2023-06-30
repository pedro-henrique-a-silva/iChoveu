import { searchCities, getWeatherByCity, getWeatherByDay } from './weatherAPI';

/**
 * Cria um elemento HTML com as informações passadas
 */
function createElement(tagName, className, textContent = '') {
  const element = document.createElement(tagName);
  element.classList.add(...className.split(' '));
  element.textContent = textContent;
  return element;
}

/**
 * Recebe as informações de uma previsão e retorna um elemento HTML
 */
function createForecast(forecast) {
  const { date, maxTemp, minTemp, condition, icon } = forecast;

  const weekday = new Date(date);
  weekday.setDate(weekday.getDate() + 1);
  const weekdayName = weekday.toLocaleDateString('pt-BR', { weekday: 'short' });

  const forecastElement = createElement('div', 'forecast');
  const dateElement = createElement('p', 'forecast-weekday', weekdayName);

  const maxElement = createElement('span', 'forecast-temp max', 'max');
  const maxTempElement = createElement('span', 'forecast-temp max', `${maxTemp}º`);
  const minElement = createElement('span', 'forecast-temp min', 'min');
  const minTempElement = createElement('span', 'forecast-temp min', `${minTemp}º`);
  const tempContainer = createElement('div', 'forecast-temp-container');
  tempContainer.appendChild(maxElement);
  tempContainer.appendChild(minElement);
  tempContainer.appendChild(maxTempElement);
  tempContainer.appendChild(minTempElement);

  const conditionElement = createElement('p', 'forecast-condition', condition);
  const iconElement = createElement('img', 'forecast-icon');
  iconElement.src = icon.replace('64x64', '128x128');

  const middleContainer = createElement('div', 'forecast-middle-container');
  middleContainer.appendChild(tempContainer);
  middleContainer.appendChild(iconElement);

  forecastElement.appendChild(dateElement);
  forecastElement.appendChild(middleContainer);
  forecastElement.appendChild(conditionElement);

  return forecastElement;
}

/**
 * Limpa todos os elementos filhos de um dado elemento
 */
function clearChildrenById(elementId) {
  const citiesList = document.getElementById(elementId);
  while (citiesList.firstChild) {
    citiesList.removeChild(citiesList.firstChild);
  }
}

/**
 * Recebe uma lista de previsões e as exibe na tela dentro de um modal
 */
export function showForecast(forecastList) {
  const forecastContainer = document.getElementById('forecast-container');
  const weekdayContainer = document.getElementById('weekdays');
  clearChildrenById('weekdays');
  forecastList.forEach((forecast) => {
    const weekdayElement = createForecast(forecast);
    weekdayContainer.appendChild(weekdayElement);
  });

  forecastContainer.classList.remove('hidden');
}

const handleWeekWeather = async (event) => {
  const weatherData = await getWeatherByDay(event.target.id);
  const weatherDayList = weatherData
    .map((weatherDay) => ({
      date: weatherDay.date,
      maxTemp: weatherDay.day.maxtemp_c,
      minTemp: weatherDay.day.mintemp_c,
      condition: weatherDay.day.condition.text,
      icon: weatherDay.day.condition.icon,
    }));
  showForecast(weatherDayList);
};

/**
 * Recebe um objeto com as informações de uma cidade e retorna um elemento HTML
 */
export function createCityElement(cityInfo) {
  const { name, country, temp, condition, icon, url } = cityInfo;

  const cityElement = createElement('li', 'city');

  const headingElement = createElement('div', 'city-heading');
  const nameElement = createElement('h2', 'city-name', name);
  const countryElement = createElement('p', 'city-country', country);
  headingElement.appendChild(nameElement);
  headingElement.appendChild(countryElement);

  const tempElement = createElement('p', 'city-temp', `${temp}º`);
  const conditionElement = createElement('p', 'city-condition', condition);

  const tempContainer = createElement('div', 'city-temp-container');
  tempContainer.appendChild(conditionElement);
  tempContainer.appendChild(tempElement);

  const iconElement = createElement('img', 'condition-icon');
  iconElement.src = icon.replace('64x64', '128x128');

  const infoContainer = createElement('div', 'city-info-container');
  infoContainer.appendChild(tempContainer);
  infoContainer.appendChild(iconElement);
  // Ver previsão
  const verPrevisaoBtn = document.createElement('button');
  verPrevisaoBtn.innerText = 'Ver previsão';
  verPrevisaoBtn.classList.add('ver-previsao');
  verPrevisaoBtn.id = url;
  verPrevisaoBtn.addEventListener('click', handleWeekWeather);

  cityElement.appendChild(headingElement);
  cityElement.appendChild(infoContainer);
  cityElement.appendChild(verPrevisaoBtn);

  return cityElement;
}

/**
 * Lida com o evento de submit do formulário de busca
 */
const createCards = (cities) => {
  const ulCitiesEl = document.querySelector('#cities');

  return cities.map((city) => createCityElement(city))
    .reduce((citiesCardContainer, citieEl) => {
      citiesCardContainer.appendChild(citieEl);
      return citiesCardContainer;
    }, ulCitiesEl);
};

export async function handleSearch(event) {
  event.preventDefault();
  clearChildrenById('cities');

  const searchInput = document.getElementById('search-input');
  const searchValue = searchInput.value;
  try {
    const cities = await searchCities(searchValue);

    const weathersCity = await Promise.all(
      cities.map(async ({ name, country, url }) => {
        const weatherdata = await getWeatherByCity(url);
        return {
          name,
          country,
          ...weatherdata,
          url };
      }),
    );
    createCards(weathersCity);
  } catch (error) {
    console.log(error.message);
  }
}

const changeTheme = (theme) => {
  // document.documentElement.setAttribute('data-theme', theme);
  document.body.className = theme;
};

export const darkMode = (event) => {
  if (!event.target.checked) {
    changeTheme('ligth');
  } else {
    changeTheme('dark');
  }
};
