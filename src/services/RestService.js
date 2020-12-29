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
        })
        .catch(function(){
            console.log('upload failed');
            return false;
        })
        return true;
    },

    savePortfolio(){
        let portfolio = store.state.portfolioName
        let portfolios = restClient.get('/portfolios/')
        let found = false
        for (let index = 0; index < portfolios.length; index++) {
            if (portfolios[index].name == portfolio) {
                found = true
                restClient.put('/portfolios/' + portfolio + '/', {name: portfolio})
                    .then(() =>{
                        console.log('Update portfolio ' + portfolio + ' successfully.')
                    })
                    .catch((err) => {
                        console.log('Update portfolio ' + portfolio + ' failed with error ' + err)
                    })

                //Update position portfolios
                let positions = store.state.positions
                for (let i = 0; i < positions.length; i++) {
                    positions[i].portfolio = portfolio
                }
                break
            }
        }

        if (!found) {
            restClient.post('/portfolios/', {name: portfolio})
                .then(() => {
                    console.log('Create portfolio ' + portfolio + ' successfully.')
                })
                .catch((err) => {
                    console.log('Create portfolio ' + portfolio + ' failed with error ' + err)
                })
        }

        //Lastly save positions
        this.savePositions()
    },

    savePositions(){
        store.state.positions.forEach(p => {
            restClient.put('/positions/' + p.id + '/', p
            ).then(function() {
                console.log('save position ' + p.stock + ' successfully.');
            })
            .catch(function() {
                console.log('save position ' + p.stock + ' failed.');
            })

        });
        return true;
    },
}