import { createStore } from 'vuex'

export default new createStore({
    state: {
        received: [],
    },
    getters: {
    },
    mutations: {
        setReceived(state, value) {
            state.received = value;
        }
    },
    actions: {
        async fetchReceived({ commit }) {
            let response = await fetch('./data.json');
            if (response.ok) {
                const data = await response.json();
                commit('setReceived', data.cards);
            }
        }
    },
    modules: {
    }
})