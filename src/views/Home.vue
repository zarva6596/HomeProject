<template>
  <div class="content">
    <h1 class="heading">What would you like to check ??</h1>

    <div class="buttons">
      <router-link 
        to="/weather" 
        class="btn"
      >
        Weather
      </router-link>
      
      <router-link 
        to="/rates"
        class='btn'
      >
        Exchange rates
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {},
};
</script>

<style lang="scss">
  @import '@/styles/reset.scss';

  .content {
    max-width: 1000px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    padding: 30px;

    .heading {
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: .2em;
      font-size: 24px;
      margin-bottom: 30px;
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: center;

      .btn {
        padding: 5px 25px;
        margin: 0 15px;
        text-transform: uppercase;
        border: 2px solid #000;
        border-radius: 10px;
        background-color: #000;
        color: #fff;
        transition: all .5s;

        &:hover {
          color: #000;
          background-color: #fff;
        }
      }
    }
  }
</style>
