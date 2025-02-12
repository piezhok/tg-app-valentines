import { createStore } from 'vuex';
import axios from 'axios';

export default new createStore({
    state: {
        received: [],
        sent: [],
        users: [],
        // initData: "user=%7B%22id%22%3A404535053%2C%22first_name%22%3A%22%D1%8D%D1%82%D0%BE%20%D0%BD%D0%B5%20%D0%BF%D0%B8%D1%80%D0%BE%D0%B3%E2%81%B4%C2%B2%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22piezhok%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FVvqVW87n5WkdJX8uzHL6O8EhVGnWgsrthtTX3YosfQM.svg%22%7D&chat_instance=8787168753902846877&chat_type=private&auth_date=1739107296&signature=Y3Zs6MT9KBwbYzUUDLtHcxO7o9Ulbx-F3Dp0cvlkvUYUh3nvtVW9uCZY10cE0qZoTiwJkLQL7a2NdWFG_a2tDA&hash=00fb7f9eacacf2a60957055978dc7c75d086d244996971eba52161d2340de69c"
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
        setUsers(state, value) {
            state.users = value;
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
        async getLetters({ commit }, [userId, initData]) {
            const response = await axios.get(`https://saharvnor.me:5000/api/cards/`, {
                params: {
                    user_id: userId,
                    telegram_init_data: initData,
                },
                headers: {
                    "accept": "application/json"
                }
            });
            const data = await response.data;
            await commit('setReceived', data.received);
            await commit('setSent', data.sent);
            await commit('setUsers', data.users);
        }
    },
    modules: {
    }
})