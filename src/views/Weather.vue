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
                I'm sorry, but I don't know, maybe you'll try later
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    data: () => ({
        weather: {},
        city: 'lviv'
    }),

    components: {
        Header
    },

    computed: {
        isEmpty() {
            return !Object.keys(this.weather).length;
        },
    },
    
    mounted() {
        this.getWeather();
    },

    methods: {
        getWeather() {
            const key = process.env.VUE_APP_WEATHER;

            this.axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${key}`)
                .then(res => res.data)
                .then(data => {
                    this.weather = {
                        city: data.name,
                        temp: `${(data.main.temp - 273.15).toFixed(2)}°c`,
                        humidity: data.main.humidity,
                        pressure: data.main.pressure,
                        sky: data.weather[0].main
                    }
                });
        },
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

                &:hover {
                    cursor: pointer;
                    border-color: #33691E;
                    background-color: #33691E;
                    color: #eee;
                }
            }
        }
    }
</style>