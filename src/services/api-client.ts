import axios from 'axios'

export const baseURL = 'http://178.63.13.157:8090/mock-api/api/'

const client = axios.create({baseURL})

export default client
