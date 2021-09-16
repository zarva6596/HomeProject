<template>
    <header class="header">
        <nav class="header__nav">
            <ul class="header__list">
                <li 
                    v-for="link in nav"
                    :key="link.url"
                    class="header__item"
                >
                    <router-link :to="link.url">
                        {{ link.title }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    data: () => ({
        nav: [
            {
                title: 'Home',
                url: '/'
            },
            {
                title: 'Rates',
                url: '/rates'
            },
            {
                title: 'Weather',
                url: '/weather'
            }
        ]
    })
}
</script>

<style lang="scss">
    .header {
        width: 100vw;
        background-color: #42A5;
        text-align: center;

        &__list {
            display: flex;
            justify-content: center;
        }

        &__item a {
            transition: all .5s;
            display: block;
            height: 100%;
            width: 100%;
            padding: 10px 20px;

            &:hover {
                background-color: #1565;
                color: #fff;
            }               
        }
    }
</style>