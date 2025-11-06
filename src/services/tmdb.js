import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'd8772efc78d8636d6c1401832d81db47',
  }
});

export default tmdb;
