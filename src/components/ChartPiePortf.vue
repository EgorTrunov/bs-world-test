<template>
  <div class="chart"> 
    <h1></h1>
  <DoughnutChart :chartData="testData" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { DoughnutChart } from 'vue-chart-3';

export default defineComponent({
  name: 'ChartPiePortf',
  components: { DoughnutChart },
  props: ['currenciesList'],
  setup(props) {
    const testData = {
      labels: [`${props.currenciesList[0].title}: ${props.currenciesList[0].value} ${props.currenciesList[0].mark}`, `${props.currenciesList[1].title}: ${props.currenciesList[1].value} ${props.currenciesList[1].mark}`, `${props.currenciesList[2].title}: ${props.currenciesList[2].value} ${props.currenciesList[2].mark}`],
      datasets: [
        {
          data: [props.currenciesList[0].actualRate * props.currenciesList[0].value, props.currenciesList[1].value * props.currenciesList[1].actualRate, props.currenciesList[2].value * props.currenciesList[2].actualRate],
          backgroundColor: ['#8C7D70', '#BB9F89', '#7A4F2D'],
        },
      ],
    };
    return { testData };
  },
});
</script>