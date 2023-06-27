// Remova os comentários a medida que for implementando as funções
const TOKEN = import.meta.env.VITE_TOKEN;
const BASE_URL = 'http://api.weatherapi.com/v1/search.json?lang=pt&';

const fetchAPI = async (term) => (await fetch(`${BASE_URL}key=${TOKEN}&q=${term}`))
  .json();

export const searchCities = async (term) => {
  try {
    if (!term) throw new Error('Nenhum parametro de pesquisa informado');

    const weatherData = await fetchAPI(term);

    if (weatherData.length === 0) throw new Error('Nenhuma cidade encontrada');

    return weatherData;
  } catch (error) {
    alert(error.message);
  }
};

export const getWeatherByCity = (/* cityURL */) => {
//   seu código aqui
};
