import axios from 'axios'

const rickyAndMorphyApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
})

export default rickyAndMorphyApi
