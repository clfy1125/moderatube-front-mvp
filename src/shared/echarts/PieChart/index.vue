<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';

import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

interface IPieChartProps {
  option: any;
}

defineProps<IPieChartProps>();
defineOptions({ name: 'PieChart' });

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
  <v-chart ref="chartRef" class="pie-chart" :option="option" autoresize />
</template>

<style lang="scss" scoped>
.pie-chart {
  width: 100%;
  height: 100%;
}
</style>
