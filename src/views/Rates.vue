<template>
  <div>
    <Header />

    <div class="rates">
      <h1 class="rates__heading">Exchange rates</h1>

      <p class="rates__paragraph">
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
    const key = process.env.VUE_APP_FIXER;
    const res = await fetch(
      `http://data.fixer.io/api/latest?access_key=${key}&symbols=UAH,USD,EUR,PLN,RUB`
    );
    this.rates = (await res.json()).rates;
    console.log(this.rates)
  },

  methods: {
    getBase(currency) {
      return (this.rates['UAH'] / this.rates[currency]).toFixed(2);
    }
  }
};
</script>

<style lang="scss">
.rates {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px;

  &__paragraph {
      margin-top: 30px;
  }

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