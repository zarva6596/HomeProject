<template>
    <div>
        <Header />

        <div class="weather page">
            <h1 class="weather__heading page__heading">Weather</h1>

            <p class="page__paragraph">
                Default city is Lviv, but you can get info about other city:
            </p>

            <form 
                @submit.prevent="getWeather()"
                class="weather__form"
            >
                <input v-model="city" type="text">

                <button type="submit">Get weather</button>
            </form>

            <table v-if="!isEmpty" class="weather__info">
                <tr 
                    v-for="(data, title) in weather"
                    :key="title"
                >
                    <td>{{ title }}</td>
                    <td>{{ data }}</td>
                </tr>
            </table>

            <div class="weather__error" v-else>
                I'm sorry but this city isn't exist
            </div>

            <form v-if="!isEmpty && !errorSend" class="weather__form" @submit.prevent="postTelegram()">
                <button
                    class="weather__send"
                    type="submit"
                    :class="{
                        'weather__send--sending': sendDone && !errorSend,
                    }"
                    :disabled="sendDone && !errorSend"
                >
                    {{ sendDone && !errorSend ? 'Messege send' : 'Send to telegram'}}
                </button>
            </form>

            <div 
                v-else-if="errorSend"
                class="weather__send--error"
            >
                Sorry something went wrong.
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    data: () => ({
        city: 'lviv',
        botId: '-1001428005227',
        errorSend: false,
        sendDone: false
    }),

    components: {
        Header
    },

    computed: {
        isEmpty() {
            return !Object.keys(this.weather).length;
        },

        weather() {
            const baseWeather = this.$store.getters.getNewWethersInfo;
            return Object.keys(baseWeather).length 
                ? {
                    country: baseWeather.sys.country,
                    city: baseWeather.name,
                    temp: `${(baseWeather.main.temp - 273.15).toFixed(2)}°С`,
                    humidity: `${baseWeather.main.humidity}%`,
                    pressure: `${baseWeather.main.pressure} hPa`,
                    sky: `${baseWeather.weather[0].main}`
                } : {}
        }
    },

    beforeMount() {
        this.$store.dispatch('getWeather', this.city)
    },

    methods: {
        async getWeather() {
            this.city.length && await this.$store.dispatch('getWeather', this.city)
        },

        postTelegram() {
            const key = process.env.VUE_APP_TELEGRAM;
            const message = `Hello, in ${this.weather.city} now the air temperature is ${this.weather.temp}, humidity is ${this.weather.humidity}, the sky is ${(this.weather.sky).toLowerCase()}, the pressure is ${this.weather.pressure}.`
            const api = process.env.VUE_APP_TELEGRAM_API
            this.axios.post(`${api}/bot${key}/sendMessage?chat_id=${this.botId}&text=${message}`)
                .then(() => this.sendDone = true)
                .catch(() => this.errorSend = true)
            
            setTimeout(() => {
                this.sendDone = false;
                this.errorSend = false;
            }, 3000);
        }
    }
}
</script>

<style lang="scss">
    @import '@/styles/page';

    .weather {
        &__info {
            margin: 30px auto;

            tr {
                td {
                    border: 2px solid #eee;
                    padding: 10px 30px;

                    &:first-of-type {
                        background-color: #558B2F;
                        color: #fff;
                        text-transform: capitalize;
                    }
                }
            }
        }

        &__form {
            margin: 30px auto;
            width: fit-content;
            display: flex;
            justify-content: center;

            input {
                border: 2px solid #558B2F;
                border-radius: 10px 0 0 10px;
                padding: 10px 25px;
                font-size: 18px;
            }

            button {
                border: 2px solid #558B2F;
                background-color: #558B2F;
                color: #fff;
                border-radius: 0 10px 10px 0;
                padding: 10px 25px;
                font-size: 18px;
                transition: all .5s;

                &.weather__send {
                    border-radius: 10px;

                    &--sending {
                        background-color: #009688;
                        border-color: #009688;

                        &:hover {
                            background-color: #009688;
                            border-color: #009688;
                        }
                    }
                }

                &:hover {
                    cursor: pointer;
                    border-color: #33691E;
                    background-color: #33691E;
                    color: #eee;
                }
            }
        }

        &__send--error {
            text-align: center;
            font-size: 30px;
        }
    }
</style>