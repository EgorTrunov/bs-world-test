# currency_converter
SPA-конвертер крипотовалют.
Реализация тестового задания для компании BLOCKCHAIN SOLUTIONS

Приложение состоит из двух вкладок: конвертер и портфель.

1. Конвертер.
  В конвертере реализован перевод 3 основных валют: Bitcoin (BTC), Ether (ETH), US Dollar (USD). При выборе валют строится график изменения курса за последние 14 дней. 

2. Портфель.
  Реализован портфель пользователя, в котором можно перевести (купить/продать) одну валюту в другую. Посмотреть текущее состояние портфеля, его оценку, а также увидеть на диаграмме текущее распределение криптовалют в портфеле. Дополнительно реализовано пополнение баланса в US Dollar (USD).

Применяемые технологии:
  - Проект реализован на Vue 3 cli. 
  - Данные получены с помощью CoinGeeko API.
  - Предпроцессор SCSS/Sass
  - Графики реализованы с помощью Chart.js вместе vue-chart-3.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
