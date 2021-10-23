<template>
  <div class="chart"> 
  <DoughnutChart :chartData="testData" :options="options" />
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
    // const data = ref([props.currenciesList[0].value, props.currenciesList[1].value, props.currenciesList[2].value]);
    const data = ref();
    const doughnutRef = ref();
    const options = ref({
      responsive: true,
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
          backgroundColor: ['#8C7D70', '#BB9F89', '#7A4F2D'],
        },
      ],
    }));
    return { testData, doughnutRef, options, data };
  },
});
</script>