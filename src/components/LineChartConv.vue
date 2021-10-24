<template>
  <div class="chart"> 
    <LineChart :chartData="testData" :options="options" style="position: relative; margin: 0 auto; width:100%; max-height: 330px"/>
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
      maintainAspectRatio: false,
      aspectRatio: 3,
    });

    const testData = computed(() => ({
      labels: props.marketChart.lastDays,
      datasets: [
        {
          label: props.marketChart.title,
          data: props.marketChart.marketChartValue,
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