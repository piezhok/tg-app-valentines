import { createStore } from 'vuex'

export default new createStore({
    state: {
        received: [],
        sent: [],
    },
    getters: {
    },
    mutations: {
        setReceived(state, value) {
            state.received = value;
        },
        setSent(state, value) {
            state.sent = value;
        },
    },
    actions: {
        async fetchReceived({ commit }) {
            const response = await fetch('./data.json');
            if (response.ok) {
                const data = await response.json();
                await commit('setReceived', data.cards);
            }
        },
        async fetchSent({ commit }) {
            const response = await fetch('./data.json');
            if (response.ok) {
                const data = await response.json();
                await commit('setSent', data.cards);
            }
        }
    },
    modules: {
    }
})