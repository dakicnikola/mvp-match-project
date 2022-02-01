import axios from 'axios'

export const baseURL = '178.63.13.157:8090/mock-api/api/'

const client = axios.create({
  baseURL,
  // headers: {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  // },
})

export default client
