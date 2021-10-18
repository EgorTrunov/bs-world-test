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
            <li class="currency__item" :class="{ 'currency--active': currencyTo.isActiveTo }" v-for="(currencyTo, id) in currencyListTo" :key="id" @click="selectCurrensyTo(id)">
              {{ currencyTo.text }}
            </li>
          </ul>
        </div>
      </div>
      <div class="currency__input">
        <input class="input" type="number" value="1">
        <input class="input" type="number" value="40000">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Converter',
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
      currencyListTo: [
        {
          text: 'USD',
          isActiveTo: true,
        },
        {
          text: 'ETH',
          isActiveTo: false,
        },
        {
          text: 'BTC',
          isActiveTo: false,
        },
      ]
    }
  },
    methods: {
    selectCurrency(index) {
      this.currencyList.forEach((element) => {
        element.isActive = false;
      });
      this.currencyList[index].isActive = true;
    },
    selectCurrencyTo(id) {
      this.currencyListTo.forEach((element) => {
        element.isActiveTo = false;
      });
      this.currencyListTo[id].isActiveTo = true;
    },
    }
}
</script>

<style lang="scss">

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
  margin: 0 auto 50px;
  text-align: center;
}

.currency__converter {
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
</style>
