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
        SAVE_POSITIONS(state){
            restService.savePositions(state.positions)
            .catch(error => {
                console.log('Error saving positions:', error)
            })
        },
        SAVE_PORTFOLIO(state, payload){
            restService.savePortfolio(state.positions, payload.portfolio)
            .catch(error => {
                console.log('Error saving portfolio:', error)
            })
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