<template>
<!-- eslint-disable max-len -->
  <div class="converter__inner">
    <h1>Конвертер криптовалюты</h1>
    <div class="currency__converter">
      <div class="currency__pick">
        <div class="currency__pick--from">
          <ul class="currency__list">
            <li class="currency__item" :class="{ 'currency--active': currency.isActive }" v-for="(currency, index) in currencyList" :key="index" @click="selectCurrency(index)">
              {{ currency.text }}
            </li>
          </ul>
        </div>
        <img class="converter__arrows" src="@/assets/arrows.svg">
        <div class="currency__pick--to">
          <ul class="currency__list currency__list--right">
            <li class="currency__item" :class="{ 'currency--active': conversion.isActive }" v-for="(conversion, index) in conversionList" :key="index" @click="selectConversion(index)">
              {{ conversion.text }}
            </li>
          </ul>
        </div>
      </div>
      <div class="currency__input">
        <input class="input" type="number" placeholder="Введите значение" v-bind:value="firstValue" v-on:input="toValueFromConverter">
        <input class="input" type="number" placeholder="Введите значение" v-bind:value="secondValue" v-on:input="fromValueToConverter">
      </div>
    </div>
    <div class="line-chart">
      <LineChartConv :market-chart="marketChart" v-if="this.toCurrency !== this.fromCurrency"/>
    </div>
  </div>
</template>

<script>
import LineChartConv from './LineChartConv.vue'

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

export default {
  name: 'Converter',
  components: { LineChartConv },
  props: ['currencies'],
  data() {
    return {
      currencyList: [
        {
          text: 'BTC',
          isActive: true,
        },
        {
          text: 'ETH',
          isActive: false,
        },
        {
          text: 'USD',
          isActive: false,
        },
      ],
      conversionList: [
        {
          text: 'USD',
          isActive: true,
        },
        {
          text: 'ETH',
          isActive: false,
        },
        {
          text: 'BTC',
          isActive: false,
        }
      ],
      marketChart: {
        lastDays: '',
        marketChartValue: '',
        titleChart: ''
      },
      firstValue: 1,
      secondValue: this.currencies.btcToUsd,
      toCurrency: 'BTC',
      fromCurrency: 'USD',
      exchange: '',
      valueMarketChartEthToBtc: '',
      valueMarketChartEthToUsd: '',
      valueMarketChartBtcToEth: '',
      valueMarketChartBtcToUsd: '',
      valueMarketChartUsdToEth: '',
      valueMarketChartUsdToBtc: '',
      dollarsLastDays: '',
    }
  },
  async created () {
    await this.marketChartBtcToUsd();
    await this.marketChartBtcToEth();
    await this.marketChartEthToUsd();
    await this.marketChartEthToBtc();
    await this.marketChartUsdToBtc();
    await this.marketChartUsdToEth();
    this.toValueFromConverter(); 
  },
  methods: {
    async marketChartBtcToUsd() {
      let data = await CoinGeckoClient.coins.fetchMarketChart('bitcoin', ({
        days: 13,
      }));
      let dateArray = [];
      let valueArray = [];
      for (let i = data.data.prices.length - 1; i >= 0; i-=24) {
        let date = data.data.prices[i][0];
        let value = Number(data.data.prices[i][1].toFixed(3));
        let normalDate = String(new Date(date));
        valueArray.unshift(value)
        dateArray.unshift(normalDate.slice(0, 15));
      }
      this.marketChart.lastDays = dateArray; 
      this.valueMarketChartBtcToUsd = valueArray;
    },
    async marketChartBtcToEth() {
      let data = await CoinGeckoClient.coins.fetchMarketChart('bitcoin', ({
        days: 13,
        vs_currency: 'eth'
      }));
      let valueArray = [];
      for (let i = data.data.prices.length - 1; i >= 0; i-=24) {
        let value = Number(data.data.prices[i][1].toFixed(3));
        valueArray.unshift(value);
      }
      this.valueMarketChartBtcToEth = valueArray;
    },
    async marketChartEthToUsd() {
      let data = await CoinGeckoClient.coins.fetchMarketChart('ethereum', ({
        days: 13,
      }));
      let valueArray = [];
      for (let i = data.data.prices.length - 1; i >= 0; i-=24) {
        let value = Number(data.data.prices[i][1].toFixed(3));
        valueArray.unshift(value);
      }
      this.valueMarketChartEthToUsd = valueArray; 
    },
    async marketChartEthToBtc() {
      let data = await CoinGeckoClient.coins.fetchMarketChart('ethereum', ({
        days: 13,
        vs_currency: 'btc'
      }));
      let valueArray = [];
      for (let i = data.data.prices.length - 1; i >= 0; i-=24) {
        let value = Number(data.data.prices[i][1].toFixed(4));
        valueArray.unshift(value);
      }
      this.valueMarketChartEthToBtc = valueArray;
    },
    async marketChartUsdToBtc() {
        let data = await CoinGeckoClient.coins.fetchMarketChart('dollars', ({
        days: 16,
        vs_currency: 'btc'
      }));
      let dateArray = [];
      let valueArray = [];
      for (let i = data.data.prices.length - 1; i >= 0; i-=3) {
        let date = data.data.prices[i][0];
        let value = Number(data.data.prices[i][1].toFixed(7));
        let normalDate = String(new Date(date));
        valueArray.unshift(value);
        dateArray.unshift(normalDate.slice(0, 15));
      }
      this.valueMarketChartUsdToBtc = valueArray;
      this.dollarsLastDays = dateArray;
    },
      async marketChartUsdToEth() {
        let data = await CoinGeckoClient.coins.fetchMarketChart('dollars', ({
        days: 16,
        vs_currency: 'eth'
      }));
      let valueArray = [];
      for (let i = data.data.prices.length - 1; i >= 0; i-=3) {
        let value = Number(data.data.prices[i][1].toFixed(6));
        valueArray.unshift(value);
      }
      this.valueMarketChartUsdToEth = valueArray;
    },
    selectCurrency(index) {
      this.toCurrency = this.currencyList[index].text;
      this.currencyList.forEach((element) => {
        element.isActive = false;
      });
      if (this.toCurrency !== this.fromCurrency)
        this.currencyList[index].isActive = true;
        this.toValueFromConverter();
    },
    selectConversion(index) {
      this.fromCurrency = this.conversionList[index].text;
      this.conversionList.forEach((element) => {
        element.isActive = false;
      });
      if (this.toCurrency !== this.fromCurrency)
        this.conversionList[index].isActive = true;
        this.toValueFromConverter();
    },
    toValueFromConverter(event) {
      if (this.toCurrency !== this.fromCurrency)
        if (event)
          this.firstValue = event.target.value;
        this.currenciesChange();
        if (this.toCurrency === 'USD') {
          this.secondValue = (this.firstValue / this.exchange).toFixed(5);
        } else {
          this.secondValue = (this.firstValue * this.exchange).toFixed(2);
        }
    },
    fromValueToConverter(event) {
      if (this.toCurrency !== this.fromCurrency)
        this.secondValue = event.target.value;
        this.currenciesChange();
          if (this.fromCurrency === 'USD') {
          this.firstValue = (this.secondValue / this.exchange).toFixed(3);
        } else {
          this.firstValue = (this.secondValue * this.exchange).toFixed(2);
        }
    },
    currenciesChange() {
      switch(this.toCurrency) {
        case 'BTC': 
          if (this.fromCurrency === 'USD') {
            this.exchange = this.currencies.btcToUsd;
            this.marketChart.title = 'BTC → USD';
            this.marketChart.marketChartValue = this.valueMarketChartBtcToUsd;
          } else if (this.fromCurrency === 'ETH') {
            this.exchange = this.currencies.btcToEth;
            this.marketChart.title = 'BTC → ETH';
            this.marketChart.marketChartValue = this.valueMarketChartBtcToEth;
          } else {
            this.exchange = 1;
          }
          break;
        case 'ETH':
          if (this.fromCurrency === 'USD') {
            this.exchange = this.currencies.ethToUsd;
            this.marketChart.title = 'ETH → USD';
            this.marketChart.marketChartValue = this.valueMarketChartEthToUsd;
          } else if (this.fromCurrency === 'BTC') {
            this.exchange = this.currencies.ethToBtc;
            this.marketChart.title = 'ETH → BTC';
            this.marketChart.marketChartValue = this.valueMarketChartEthToBtc;
          } else {
            this.exchange = 1;
          } 
          break;
        case 'USD': 
          if (this.fromCurrency === 'ETH') {
            this.exchange = this.currencies.ethToUsd;
            this.marketChart.title = 'USD → ETH';
            this.marketChart.marketChartValue = this.valueMarketChartUsdToEth;
            this.marketChart.lastDays = this.dollarsLastDays;
          } else if (this.fromCurrency === 'BTC') {
            this.exchange = this.currencies.btcToUsd;
            this.marketChart.title = 'USD → BTC';
            this.marketChart.marketChartValue = this.valueMarketChartUsdToBtc;
            this.marketChart.lastDays = this.dollarsLastDays;
          } else {
            this.exchange = 1; 
          }
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

*{
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }
  input[type=number] {
  -moz-appearance: textfield;
  }
}

$text-color: #bb9f89;
$primary-color: #27262E;

%active {
  background: $text-color;
  color: $primary-color;
}

%input {
  display: block;
  background: $primary-color;
  color: $text-color;
  border: 2px solid $text-color;
  width: 300px;
  height: 40px;
  padding: 5px 10px;
}

.converter__inner {
  margin: 0 auto;
  max-width: 800px;
}

h1 {
  font-size: 24px;
  line-height: 2.56em; 
  margin: 0 auto 15px;
  text-align: center;
}

.currency__converter {
  margin-bottom: 15px;
  .currency__pick {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
  }
  .currency__list {
    width: 300px;
    display: flex;
    justify-content: flex-start;
  }
  .currency__list--right {
    justify-content: flex-end;
  }
  .currency__item {
    user-select: none;
    border: 3px solid $text-color;
    cursor: pointer;
    padding: 10px 35px;
  }
  .currency__item:nth-child(2) {
    border-right: none;
    border-left: none;
  }
  .currency__item:hover {
    transition: 0.7s ease;
  }
  .currency--active {
    @extend %active;
  }
  .converter__arrows {
    margin: 0 auto;
    position: relative;
    top: 30px;
  }
  .currency__input {
    display: flex;
    justify-content: space-between;
    .input {
      @extend %input;
    }
  }
}

@media (max-width: 700px) {
  h1 {
    margin-bottom: 30px;
  }
  .currency__converter {
    .currency__pick {
      grid-template-columns: repeat(1, 1fr);
      justify-items: center;
    }
    .converter__arrows {
      top: 0;
      transform: rotate(90deg);
    }
    .currency__input {
      flex-direction: column;
      align-items: center;
      gap: 25px;
    }
  }
}

@media (max-width: 425px) {
  h1 {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .converter__arrows {
    width: 25px;
  }
}
</style>