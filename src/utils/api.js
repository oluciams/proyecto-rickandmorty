import axios from "axios";

export const getCharacterApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 5000
})