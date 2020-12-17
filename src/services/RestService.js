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

    getPortfolios(){
        return restClient.get('/portfolios/')
    },

    getClient(){
        return restClient
    },

    uploadPosition(file, portfolio){
        let formData = new FormData();
        formData.append('positionFile',file)
        formData.append('portfolio', portfolio)
        restClient.post('uploadPosition/',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function(){
            console.log('upload successful');
        })
        .catch(function(){
            console.log('upload failed');
            return false;
        })

        return true;
    },
}