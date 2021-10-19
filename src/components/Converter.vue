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
        <input class="input" type="number" v-model="firstValue">
        <input class="input" type="number" v-model="secondValue">
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
        },
      ],
      firstValue: 1,
      secondValue: 40000
    }
  },
    methods: {
    selectCurrency(index) {
      this.currencyList.forEach((element) => {
        element.isActive = false;
      });
      this.currencyList[index].isActive = true;
    },
    selectConversion(index) {
      this.conversionList.forEach((element) => {
        element.isActive = false;
      });
      this.conversionList[index].isActive = true;
    },
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
