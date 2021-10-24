<template>
  <div class="chart"> 
  <DoughnutChart :chartData="testData" :options="options"/>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { DoughnutChart } from 'vue-chart-3';

export default defineComponent({
  name: 'ChartPiePortf',
  components: { DoughnutChart },
  props: ['currenciesList'],

  setup(props) {
    const data = ref();
    const doughnutRef = ref();
    const options = ref({
      responsive: true,
      maintainAspectRatio: true,
      plagins: {
        title: {
          display: true,
          text: 'Распределение валюты в портфеле'
        },
      }
    });

    const testData = computed(() => ({
      labels: [`${props.currenciesList[0].title}: ${props.currenciesList[0].value} ${props.currenciesList[0].mark}`, `${props.currenciesList[1].title}: ${props.currenciesList[1].value} ${props.currenciesList[1].mark}`, `${props.currenciesList[2].title}: ${props.currenciesList[2].value} ${props.currenciesList[2].mark}`],
      datasets: [
        {
          data: [props.currenciesList[0].value, (props.currenciesList[1].value * props.currenciesList[1].actualRate), (props.currenciesList[2].value * props.currenciesList[2].actualRate)],
          backgroundColor: ['#BA9375', '#BB9F89', '#D1B58E'],
        },
      ],
    }));
    return { testData, doughnutRef, options, data };
  },
});
</script>

<style lang="scss">
  .chart {
    max-height: 400px;
    height: auto;
  }

  @media (max-width: 450px) {
    .chart {
      max-width: 350px;
    }
  }
  @media (max-width: 380px) {
    .chart {
      max-width: 300px;
    }
  }
</style>