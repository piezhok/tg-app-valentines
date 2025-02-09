import { createStore } from 'vuex'

export default new createStore({
    state: {
        received: [],
        sent: [],
        initData: ""
    },
    getters: {
        userInfo (state) {
            let temp = decodeURIComponent(state.initData).replace("user=", "").split("&")[0];
            return JSON.parse(temp);
        }
    },
    mutations: {
        setReceived(state, value) {
            state.received = value;
        },
        setSent(state, value) {
            state.sent = value;
        },
        setInitData(state) {
            state.initData = window.Telegram.WebApp.initData;
        }
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
        },
        // async fetchInitData({ commit }) {
        //     const initData = await window.Telegram.WebApp.initData
        //     await commit('setInitData', initData);
        // }
    },
    modules: {
    }
})