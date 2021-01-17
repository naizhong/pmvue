import Vue from 'vue'
import Vuex from 'vuex'
import restService from "@/services/RestService.js"
import { getField, updateField } from 'vuex-map-fields'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        positions:[],
        newPositions:[],
        stocks: [],
        portfolios: [],
        portfolioNames: [],
        portfolioName: null,
        file: null,
        trades: [],
    },
    getters:{
        getField,
    },
    mutations: {
        POPULATE_POSITIONS(state){
            restService.getPositions(this.state.portfolioName)
            .then(Response => {
                state.positions = Response.data
            })
            .catch(error => {
                console.log('Error getting positions:', error)
            })
        },
        POPULATE_PORTFOLIOS(state){
            restService.getPortfolios()
            .then(Response => {
                state.portfolios = Response.data
                state.portfolioNames = state.portfolios.map(p => p.name)
            })
            .catch(error => {
                console.log('Error getting portfolios:', error)
            })
        },
        POPULATE_STOCKS(state){
            restService.getStocks()
            .then(Response => {
                state.stocks = Response.data
            })
            .catch(error => {
                console.log('Error getting stocks:', error)
            })
        },
        SAVE_PORTFOLIO(state, payload){
            console.log("Saving portfolio " + payload.portfolio)
            for( var i = 0; i < state.positions.length; i++){
                state.positions[i]["portfolio"] = payload.portfolio
            }

            restService.savePortfolio(state.positions, payload.portfolio)
        },
        updateField,
    },
    actions: {
        populatePositions({ commit }) {
            commit('POPULATE_POSITIONS')
        },
        populatePortfolios({ commit }) {
            commit('POPULATE_PORTFOLIOS')
        },
        populateStocks({ commit }) {
            commit('POPULATE_STOCKS')
        },
        savePortfolio({ commit } , payload){
            commit('SAVE_PORTFOLIO', payload)
        },
    },
})