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
            const response = await fetch('./data.json');
            if (response.ok) {
                const data = await response.json();
                await commit('setReceived', data.cards);
            }
        }
    },
    modules: {
    }
})