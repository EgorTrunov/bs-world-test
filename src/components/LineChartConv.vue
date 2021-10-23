<template>
  <div class="chart"> 
    <LineChart :chartData="testData" :options="options" />
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { LineChart } from 'vue-chart-3';

export default defineComponent({
  name: 'LineChartConv',
  components: { LineChart },
  props: ['marketChart'],

  setup(props) {
    const data = ref();
    const lineRef = ref();
    const options = ref({
      responsive: true,
    });

    const testData = computed(() => ({
      labels: props.marketChart.lastDays,
      datasets: [
        {
          label: 'BTC',
          data: props.marketChart.marketChartBtcToUsd,
          borderJoinStyle: 'round',
          lineTension: 0,
          borderColor: '#bb9f89',
        },
      ],
    }));

    return { testData, lineRef, options, data };
  },
});
</script>
