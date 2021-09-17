import Vue from 'vue'
import Vuex from 'vuex'
import rates from './rates'
import weather from './weather'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        rates, weather
    }
})