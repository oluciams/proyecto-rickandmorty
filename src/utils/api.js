import axios from "axios";

export const getCharacterApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character',
  timeout: 5000
})