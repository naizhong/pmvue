import axios from 'axios'

const restClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
    }
})

export default {
    getPositions(){
        return restClient.get('/positions/')
    },
}