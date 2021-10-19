<template>
  <div class="container">
    <header class="header">
      <a class="header__img" href="#">
        <img src="@/assets/logo.svg" width="43" height="47">
      </a>
      <div class="header__tabs">
        <button class="button header__tab" type="button" :class="{ 'tab--active': tab.isActive }" v-for="(tab, index) in tabList" :key="index" @click="selectTab(index)">
          {{ tab.text }}
        </button> 
      </div>
    </header>
    <main class="main">
      <Converter v-if="tabList[0].isActive"/>
      <Portfolio v-if="tabList[1].isActive"/>
    </main>
  </div>
</template>

<script>
import Converter from './components/Converter.vue'
import Portfolio from './components/Portfolio.vue'

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

export default {
  name: 'App',
  components: {
    Converter, Portfolio
  }, 
  data() {
    return {
      tabList: [
        {
          text: 'Конвертер',
          isActive: true,
        },
        {
          text: 'Портфель',
          isActive: false,
        }
      ]
    }
  },
  async created (){
      await this.currentRateBtc();
      await this.currentRateEth();
  },
  methods: {
    selectTab(index) {
      this.tabList.forEach((element) => {
        element.isActive = false;
      });
      this.tabList[index].isActive = true;
    },
    currentRateBtc: async() => {
      let data = await CoinGeckoClient.coins.fetch('bitcoin', {});
      let btcToUsd = data.data.market_data.current_price.usd;
      let btcToEth = data.data.market_data.current_price.eth;
      console.log('btcToUsd: ' + btcToUsd, 'btcToEth: ' + btcToEth);
    },
    currentRateEth: async() => {
      let data = await CoinGeckoClient.coins.fetch('ethereum', {});
      let ethtoUsd = data.data.market_data.current_price.usd;
      let ethToBtc = data.data.market_data.current_price.btc;
      console.log('ethtoUsd: ' + ethtoUsd, 'ethToBtc: ' + ethToBtc);
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.92em;
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
}

$primary-color: #27262E;
$text-color: #bb9f89;


%button {
  padding: 10px 25px;
  background-color: $primary-color;
  border: 3px solid $text-color;
  color: $text-color;
  width: 125px;
  height: 47px;
  cursor: pointer;
}

body {
  background: $primary-color;
  color: $text-color;
}

.container {
  max-width: 1240px;
  padding: 20px;
  margin: 0 auto;
}

.button {
  @extend %button;
}
.button:hover {
  background: $text-color;
  color: $primary-color;
  transition: 0.7s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
  .header__tab:first-of-type {
    margin-right: 20px;
  }
}

@media (max-width: 430px) {
  .container {
    padding: 10px;
  }
  .header {
    margin-bottom: 30px;
  .header__tab:first-of-type {
    margin-right: 10px;
  }
  .header__tab {
    max-width: 100px;
    padding: 5px;
  }
  }
}
</style>
