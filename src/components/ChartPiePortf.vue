<template>
  <DoughnutChart :chartData="testData" />
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
      labels: [props.currenciesList[0].title, props.currenciesList[1].title, props.currenciesList[2].title],
      datasets: [
        {
          data: [props.currenciesList[0].value, props.currenciesList[1].value, props.currenciesList[2].value],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B'],
        },
      ],
    };
    return { testData };
  },
});
</script>