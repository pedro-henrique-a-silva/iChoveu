import { handleSearch, darkMode } from './helpers/pageFunctions';
import './style.css';

document.getElementById('search-form')
  .addEventListener('submit', handleSearch);

document.getElementById('close-forecast')
  .addEventListener('click', () => {
    document.getElementById('forecast-container').classList.add('hidden');
  });

document.getElementById('toggle-dark')
  .addEventListener('change', darkMode);
