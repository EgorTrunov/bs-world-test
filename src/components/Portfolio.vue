<template>
<!-- eslint-disable max-len -->
	<div class="portfolio__inner">
		<div class="content__column">
			<div class="portfolio__header">
				<svg class="svg--avatar" enable-background="new 0 0 48 48" height="48px" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="48px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M24,45C12.402,45,3,35.598,3,24S12.402,3,24,3s21,9.402,21,21S35.598,45,24,45z   M35.633,39c-0.157-0.231-0.355-0.518-0.514-0.742c-0.277-0.394-0.554-0.788-0.802-1.178C34.305,37.062,32.935,35.224,28,35  c-1.717,0-2.965-1.288-2.968-3.066L25,31c0-0.135-0.016,0.148,0,0v-1l1-1c0.731-0.339,1.66-0.909,2.395-1.464l0.135-0.093  C29.111,27.074,29.923,26.297,30,26l0.036-0.381C30.409,23.696,31,20.198,31,19c0-4.71-2.29-7-7-7c-4.775,0-7,2.224-7,7  c0,1.23,0.591,4.711,0.963,6.616l0.035,0.352c0.063,0.313,0.799,1.054,1.449,1.462l0.098,0.062C20.333,28.043,21.275,28.657,22,29  l1,1v1c0.014,0.138,0-0.146,0,0l-0.033,0.934c0,1.775-1.246,3.064-2.883,3.064c-0.001,0-0.002,0-0.003,0  c-4.956,0.201-6.393,2.077-6.395,2.077c-0.252,0.396-0.528,0.789-0.807,1.184c-0.157,0.224-0.355,0.51-0.513,0.741  c3.217,2.498,7.245,4,11.633,4S32.416,41.498,35.633,39z M24,5C13.507,5,5,13.507,5,24c0,5.386,2.25,10.237,5.85,13.694  C11.232,37.129,11.64,36.565,12,36c0,0,1.67-2.743,8-3c0.645,0,0.967-0.422,0.967-1.066h0.001C20.967,31.413,20.967,31,20.967,31  c0-0.13-0.021-0.247-0.027-0.373c-0.724-0.342-1.564-0.814-2.539-1.494c0,0-2.4-1.476-2.4-3.133c0,0-1-5.116-1-7  c0-4.644,1.986-9,9-9c6.92,0,9,4.356,9,9c0,1.838-1,7-1,7c0,1.611-2.4,3.133-2.4,3.133c-0.955,0.721-1.801,1.202-2.543,1.546  c-0.005,0.109-0.023,0.209-0.023,0.321c0,0-0.001,0.413-0.001,0.934h0.001C27.033,32.578,27.355,33,28,33c6.424,0.288,8,3,8,3  c0.36,0.565,0.767,1.129,1.149,1.694C40.749,34.237,43,29.386,43,24C43,13.507,34.493,5,24,5z" fill-rule="evenodd"/></svg>
				<h1>Здравствуйте, {{ userName }}</h1>
			</div>
			<div class="portfolio__content">
				<div class="rating__inner">
					<p class="portfolio__rating">Оценка портфеля: {{ ratingValue }}$</p>
					<button class="button button--recharge" @click="showRecharge = !showRecharge">Пополнить</button>
					<div class="recharge-balance__inner" v-if="showRecharge">
						<input class="input--recharge" type="number" placeholder="Введите значение" @input="rechargeBalance">
						<button class="button button--submiit" type="button" @click="showRecharge = !showRecharge; rechargeBalanceConfirm()">Подтвердить</button>
					</div>
				</div>
				<ul class="portfolio__list">
					<span>Содержание портфеля:</span>
					<li v-for="(currency, index) in currenciesList" :key="index">
						{{ currency.title }}: {{ currency.value }} {{ currency.mark }} 
					</li>
				</ul>
				<button class="button" type="button" @click="show = !show">Перевод между валютами</button>
				<transition v-if="show">
					<div class="transfer__inners">
						<label class="transfer__label">
							<span>Счет списания:</span>
							<div class="transfer__select" name="select" @click="transferFrom = !transferFrom" key="transferFrom">
								<p class="transfer__select--active">{{ transferFromActive }}</p>
								<div class="select__inner">
									<ul class="select__list" v-if="transferFrom">
										<li class="select__item" v-for="(currency, index) in currenciesList" :key="index" @click="selectCurrency(index, 'transferFromActive')">{{ currency.title }}</li>
									</ul>
								</div>
								<span class="select__arrow">
									<img class="img__arrow" src="@/assets/arrow-select.svg" v-if="!transferFrom">
									<img class="img__arrow" src="@/assets/arrow-select-rotate.svg" v-else>
								</span>
							</div>
						</label>
						<label class="transfer__label">
							<span>Счет зачисления:</span>
							<div class="transfer__select" name="select" @click="transferIn = !transferIn" key="transferIn">
								<p class="transfer__select--active">{{ transferInActive }}</p>
								<div class="select__inner">
									<ul class="select__list" v-if="transferIn">
										<li class="select__item" v-for="(currency, index) in currenciesList" :key="index" @click="selectCurrency(index, 'transferInActive')">{{ currency.title }}</li>
									</ul>
								</div>
								<span class="select__arrow">
									<img class="img__arrow" src="@/assets/arrow-select.svg" v-if="!transferIn">
									<img class="img__arrow" src="@/assets/arrow-select-rotate.svg" v-else>
								</span>
							</div>
						</label>
						<label class="transfer__label">
							<span>Сумма списания:</span>
							<input class="input" type="number" placeholder="Введите значение" :value="firstValue" @input="transferFromCurrency">
							<!-- <p>на счету: {{  }}</p> -->
						</label>
						<label class="transfer__label">
							<span>Сумма зачисления:</span>
							<input class="input" type="number" placeholder="Введите значение" :value="secondValue" @input="transferInCurrency">
							<!-- <p>на счету: {{  }}</p> -->
							<span>Курс перевода: </span>
						</label>
						<button class="button button--submiit" type="button" @click="show = !show; transferConfirm()">Подтвердить</button>
					</div>
				</transition>
			</div>
		</div>
		<div class="chart__column">
			<h1>Распределение валюты в портфеле</h1>
			<ChartPiePortf :currencies-list="currenciesList"/>
		</div>
	</div>
</template>

<script>
import ChartPiePortf from './ChartPiePortf.vue';

export default {
  components: { ChartPiePortf },
	name: 'Portfolio',
	props: ['currencies'],
	mounted() {
		this.checkRatingValue();
	},
	data() {
		return {
			userName: 'Анатолий Геннадьевич',
			ratingValue: 100000,
			currenciesList: [
				{
					title: 'USD',
					value: 10000,
					mark: '$',
					actualRate: 1

				},
				{
					title: 'BTC',
					value: 1,
					mark: '฿',
					actualRate: this.currencies.btcToUsd

				},
				{
					title: 'ETH',
					value: 100,
					mark: 'Ξ',
					actualRate: this.currencies.ethToUsd
				},
			],
			showRecharge: false,
			show: false,
			transferFrom: false,
			transferIn: false,
			transferFromActive: 'Не выбран',
			transferInActive: 'Не выбран',
			exchange: '',
			firstValue: '',
			secondValue: ''
		}
	}, 
	methods: {
		selectCurrency(index, value) {
			switch(value) {
				case 'transferFromActive':
					this.transferFromActive = this.currenciesList[index].title;
					break;
				case 'transferInActive': 
					this.transferInActive = this.currenciesList[index].title;
					break;
				default:
					break;
			}
		},
		transferFromCurrency(event) {
			this.firstValue = event.target.value;
			this.currenciesChange();
			if (this.transferFromActive === 'USD') {
				this.secondValue = (this.firstValue / this.exchange).toFixed(3);
			} else {
				this.secondValue = (this.firstValue * this.exchange).toFixed(3);
			}
		},
		transferInCurrency(event) {
			this.secondValue = event.target.value;
			this.currenciesChange();
			if (this.transferInActive === 'USD') {
				this.firstValue = (this.secondValue / this.exchange).toFixed(3);
			} else {
				this.firstValue = (this.secondValue * this.exchange).toFixed(3);
			}
		},
		currenciesChange() {
			switch(this.transferFromActive) {
				case 'BTC': 
					if (this.transferInActive === 'USD') {
						this.exchange = this.currencies.btcToUsd;
					} else if (this.transferInActive === 'ETH') {
							this.exchange = this.currencies.btcToEth;
					} else {
							this.exchange = 1;
					}
					break;
				case 'ETH':
					if (this.transferInActive === 'USD') {
						this.exchange = this.currencies.ethToUsd;
					} else if (this.transferInActive === 'BTC') {
						this.exchange = this.currencies.ethToBtc;
					} else {
						this.exchange = 1;
					} 
					break;
				case 'USD': 
					if (this.transferInActive === 'ETH') {
						this.exchange = this.currencies.ethToUsd;
					} else if (this.transferInActive === 'BTC') {
						this.exchange = this.currencies.btcToUsd;
					} else {
						this.exchange = 1; 
					}
					break;
			}
		},
		transferConfirm() {
			for (const title in this.currenciesList) {
				if (this.currenciesList[title].title === this.transferInActive) {
					this.currenciesList[title].value = this.currenciesList[title].value + Number(this.secondValue);
				}
				if (this.currenciesList[title].title === this.transferFromActive) {
					
					this.currenciesList[title].value = this.currenciesList[title].value - Number(this.firstValue);
				}
			}
			this.checkRatingValue();
		},
		checkRatingValue() {
			this.ratingValue = ((this.currenciesList[1].value * this.currencies.btcToUsd) + (this.currenciesList[2].value * this.currencies.ethToUsd) + this.currenciesList[0].value).toFixed(2);
		},
		rechargeBalance(event) {
		this.rechargeValue = event.target.value;
		},
		rechargeBalanceConfirm() {
			this.currenciesList[0].value = this.currenciesList[0].value + Number(this.rechargeValue);
			this.transferConfirm();
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

%text {
	font-size: 15px;
	line-height: 2em;
	color: $text-color;
}


%text-transfer {
	font-size: 15px;
	line-height: 12px;
	color: $text-color;
}

%style-select {
	width: 125px;
	height: 35px;
	border: 2px solid $text-color;
	padding-left: 5px;
	background-color: $primary-color;
	color: $text-color;
}

%input {
	display: block;
	background: $primary-color;
	color: $text-color;
	border: 2px solid $text-color;
	height: 35px;
	padding: 5px 10px;
}

.portfolio__inner {
	margin: 0 auto;
	max-width: 1000px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.portfolio__header {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	.svg--avatar {
			margin-right: 20px;
			fill: $text-color;
	}
	h1 {    
			font-size: 20px;
			line-height: 2.56em; 
	}
}

.portfolio__content {
	.rating__inner {
		max-width: 520px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		.portfolio__rating {
				@extend %text;
				margin-bottom: 15px;
		}
		.button--recharge {
			width: 100px;
			padding: 1px;
			height: 30px;
		}
		.recharge-balance__inner {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			.input--recharge {
				@extend %input;
				width: 150px;
				height: 30px;
				margin-right: 10px;
			}
			.button--submiit {
				display: block;
				width: 100px;
				height: 30px;
				padding: 1px;
				margin: 0;
			}
		}
	}
	.portfolio__list {
			margin-bottom: 15px;
			span {
					@extend %text;
			}
			li {
					margin-left: 15px;
					@extend %text; 
			}
	}
	.button {
			width: 220px;
			margin-bottom: 20px;
			height: 40px;
			padding: 5px;
	}
}

.transfer__label {
	max-width: 420px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 15px;
	align-items: center;
	margin-bottom: 15px;
	span {
		@extend %text-transfer;
	}
	.transfer__select {
		@extend %style-select;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		cursor: pointer;
	}
	.select__arrow {
		padding: 8px;
	}
	.select__inner {
		position: absolute;
		width: 125px;
		top: 33px;
		right: -2px;
		z-index: 2;
		background: $text-color;
		color: $primary-color;
		.select__list {
			list-style: none;
		}
		.select__item {
			padding-left: 12px;
			padding-top: 5px;
			height: 28px;
		}
		.select__item:hover {
			background-color: $primary-color;
			color: $text-color;
			transition: 0.8s;
		}
	}
	.input {
		@extend %input;
	}
}

.button--submiit {
	margin-top: 15px;
}

h1 {
	@extend %text;
	text-align: center;
}
</style>