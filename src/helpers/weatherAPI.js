// Remova os comentários a medida que for implementando as funções
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchAPI = async (url) => (await fetch(url)).json();

export const searchCities = async (term) => {
  const BASE_URL = 'http://api.weatherapi.com/v1/search.json?lang=pt&';
  try {
    if (!term) throw new Error('Nenhum parametro de pesquisa informado');

    const weatherData = await fetchAPI(`${BASE_URL}key=${TOKEN}&q=${term}`);

    if (weatherData.length === 0) throw new Error('Nenhuma cidade encontrada');

    return weatherData;
  } catch (error) {
    alert(error.message);
  }
};

export const getWeatherByCity = async (cityURL) => {
  const BASE_URL = 'http://api.weatherapi.com/v1/current.json?lang=pt&';
  const weatherCityData = await fetchAPI(`${BASE_URL}key=${TOKEN}&q=${cityURL}`);
  return {
    temp: weatherCityData.current.temp_c,
    condition: weatherCityData.current.condition.text,
    icon: weatherCityData.current.condition.icon,
  };
};

export const getWeatherByDay = async (cityURL) => {
  const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json?lang=pt&';
  const DIAS = 7;
  const weatherData = await fetchAPI(`${BASE_URL}key=${TOKEN}&q=${cityURL}&days=${DIAS}`);
  return weatherData.forecast.forecastday;
};
