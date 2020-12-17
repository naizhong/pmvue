import Vue from 'vue'
import Vuex from 'vuex'
import restService from "@/services/RestService.js"
import { getField, updateField } from 'vuex-map-fields'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        positions:{},
        stocks: {},
        portfolios: {},
        portfolioNames: {},
        file: null,
    },
    getters:{
        getField,
    },
    mutations: {
        POPULATE_POSITIONS(state){
            restService.getPositions()
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
        updateField,
    },
    actions: {
        populatePositions({ commit }) {
            commit('POPULATE_POSITIONS')
        },
        populatePortfolios({ commit }) {
            commit('POPULATE_PORTFOLIOS')
        },
    },
})