import axios from "axios";

export default {
    actions: {
        async getRates() {
            const key = process.env.VUE_APP_FIXER
            const api = process.env.VUE_APP_FIXER_API
            
            const res = await axios.get(`${api}=${key}&symbols=UAH,USD,EUR,PLN,RUB`)
            
            return await res.data.rates;
        }
    },
}