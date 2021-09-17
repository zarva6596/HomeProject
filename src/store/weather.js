import axios from "axios";
export const GET_INFO = "GET_INFO"

export default {
    state: {
        weather: {}
    },

    mutations: {
        [GET_INFO]: (state, data) => {
            state.weather = data;
        }
    },

    getters: {
        getNewWethersInfo: state => state.weather
    },

    actions: {
        async getWeather({ commit }, city) {
            try {
                const key = process.env.VUE_APP_WEATHER;
                const api = process.env.VUE_APP_WEATHER_API;

                const { data } = await axios.get(`${api}=${city}&appid=${key}`)

                commit('GET_INFO', data);
            } catch (e) {
                commit('GET_INFO', false)
            }
        }
    },
}