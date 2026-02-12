<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

import { BarChart as EBarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([CanvasRenderer, EBarChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent]);

interface IBarChartProps {
  option: any;
}
defineProps<IBarChartProps>();
defineOptions({ name: 'BarChart' });

const chartRef = ref<InstanceType<typeof VChart>>();

onMounted(() => {
  const resizeHandler = () => chartRef.value?.chart?.resize();
  window.addEventListener('resize', resizeHandler);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
  });
});
</script>

<template>
  <v-chart ref="chartRef" class="bar-chart" :option="option" autoresize />
</template>

<style scoped lang="scss">
// .bar-chart {
//   width: 100%;
//   height: 100%;
// }
</style>
