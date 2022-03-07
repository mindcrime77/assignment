import { createStore } from 'vuex'
import { currencyList, accomodationsList } from './apiCalls'

export default createStore({
    state: {
        tempArray: [],
        currencies: null,
        users: [],
        selection: []
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getTemp(state) {
            return state.tempArray
        },
        getSelection(state) {
            return state.selection
        }

    },
    mutations: {
        resetSelection(state) {
            state.selection = []
        },
        setSelection(state, selection) {
            state.selection = selection
        },
        setCurrencies(state, currencies) {
            state.currencies = currencies
        },
        setUsers(state, users) {
            state.users = users
        },
        sortUsersByName(state, toggle) {
            toggle ? state.users.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) : state.users.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
        },
        sortUsersByCountry(state, toggle) {
            toggle ? state.users.sort((a, b) => a.country.toLowerCase() > b.country.toLowerCase() ? 1 : -1) : state.users.sort((a, b) => a.country.toLowerCase() < b.country.toLowerCase() ? 1 : -1)
        },
        sortUsersByCity(state, toggle) {
            toggle ? state.users.sort((a, b) => a.city.toLowerCase() > b.city.toLowerCase() ? 1 : -1) : state.users.sort((a, b) => a.city.toLowerCase() < b.city.toLowerCase() ? 1 : -1)
        },
        setAvaliable(state, payload) {
            state.users = state.users.filter(item => item.avaliable === payload)
        },
        setTempArray(state, payload) {
            state.tempArray = payload
        }
    },
    actions: {
        async setCurrencies({ commit, state }) {
            const result = await currencyList()
            commit('setCurrencies', result.rates)
            console.log(state.currencies)
        },
        async setUsers({ commit, state }) {
            const result = await accomodationsList()
            commit('setUsers', result)
            commit('setTempArray', result)
            console.log(state.users)
        },
        async sortUsersByName({ commit, state }, payload) {
            commit('sortUsersByName', payload)
            //let sort = state.users.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
            commit('setTempArray', state.users)
        },
        async sortUsersByCountry({ commit, state }, payload) {
            commit('sortUsersByCountry', payload)
            //let sort = state.users.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
            commit('setTempArray', state.users)
        },
        async sortUsersByCity({ commit, state }, payload) {
            commit('sortUsersByCity', payload)
            //let sort = state.users.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
            commit('setTempArray', state.users)
        },
        async setAvaliable({ commit, state }, payload) {
            //commit('setAvaliable', payload)
            let temp = state.users.filter(item => item.avaliable === payload)
            commit('setTempArray', temp)
        },
        async setFilter({ commit, state }, payload) {

            let temp = state.users.filter(item => item.name.toLowerCase().trim().includes(payload))
            commit('setTempArray', temp)
        },
        async setFilterCountry({ commit, state }, payload) {

            let temp = state.users.filter(item => item.country.toLowerCase().trim().includes(payload))
            commit('setTempArray', temp)
        },
        async setFilterCity({ commit, state }, payload) {

            let temp = state.users.filter(item => item.city.toLowerCase().trim().includes(payload))
            commit('setTempArray', temp)
        }
    }
})