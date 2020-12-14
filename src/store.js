import Vue from 'vue'
import Vuex from 'vuex'
import restService from "@/services/RestService.js"
import { getField, updateField } from 'vuex-map-fields';


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        positions:{},
        stocks: {},
        portfolios: {},
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
                console.log('There was an error:', error)
            })
        },
        updateField,
    },
    actions: {
        populatePositions({ commit }) {
            commit('POPULATE_POSITIONS')
        }
    },
})