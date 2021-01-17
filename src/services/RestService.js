import axios from 'axios'
import store from '@/store.js'

const restClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
    }
})

export default {
    getPositions(portfolio){
        return restClient.get('/positions?portfolio=' + portfolio)
    },

    getPortfolios(){
        return restClient.get('/portfolios/')
    },

    getStocks(){
        return restClient.get('/stocks/')
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
            console.log('upload successfully.');
            store.dispatch('populateStocks');
            store.dispatch('populatePortfolios');
            store.dispatch('populatePositions');
        })
        .catch(function(){
            console.log('upload failed');
            return false;
        })
        return true;
    },

    savePortfolio(){
        var port = store.state.portfolioName
        restClient.post('/portfolios/', {name: port})
        .then(() =>{
            console.log('Update portfolio ' + port + ' successfully.')
        })
        .catch((err) => {
            console.log('Update portfolio ' + port + ' failed with error ' + err)
                })
        this.savePositions()
    },

    savePositions(){
        store.state.positions.forEach(p => {
            restClient.post('/positions/', p
            ).then(function() {
                console.log('new position ' + p.stock + ' for ' + p.portfolio + ' successfully.');
            })
            .catch(function() {
                console.log('new position ' + p.stock + ' for ' + p.portfolio + ' failed.');
            })

        });
        return true;
    },
}