<template>
  <div>
    <Header />

    <div class="page rates">
      <h1 class="rates__heading">Exchange rates</h1>

      <p class="page__paragraph rates__paragraph">
        The values in the table are presented in relation to the Ukrainian hryvnia
      </p>

      <table class="rates__list">
        <tr class="rates__item rates__list-headings">
          <td>Name</td>
          <td>Rate</td>
        </tr>
        <tr
          v-for="(rates, cur) in rates"
          :key="cur"
          class="rates__item"
        >
          <td>{{ cur }}</td>
          <td>{{ getBase(cur) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  data: () => ({
    rates: {},
  }),

  components: {
    Header,
  },

  async mounted() {
    this.rates = await this.$store.dispatch('getRates')
  },

  methods: {
    getBase(currency) {
      if (this.rates['UAH'] && this.rates[currency]) {
        return (this.rates['UAH'] / this.rates[currency]).toFixed(2);
      }

      return 'Please try again later'
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/page';

.rates {
  &__list {
    margin: 30px auto;
    width: fit-content;

    &-headings {
      td {
        background-color: #d4e157;
        color: #fff;
        font-weight: bold;
        letter-spacing: 3px;
      }
    }
  }

  &__item {
    td {
      height: 45px;
      padding: 15px 30px;
      border: 1px solid #eee;
    }
  }
}
</style>