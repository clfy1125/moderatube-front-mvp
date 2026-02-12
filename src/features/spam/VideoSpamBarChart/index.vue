<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import BarChart from '@/shared/echarts/BarChart/index.vue';
import { formatDate } from '@/shared/utils/formatDate';

interface IVideoSpamBarChartProps {
  dailySpamStats?: {
    date: string;
    spam_count: number;
  }[];
}

const props = defineProps<IVideoSpamBarChartProps>();
defineOptions({ name: 'VideoSpamBarChart' });

const option = ref({
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'transparent',
    borderWidth: 0,
    extraCssText: 'box-shadow:none;',
    position: (point: number[], _params: any, _dom: any, _rect: any, size: { viewSize: number[]; contentSize: number[] }) => [point[0] - size.contentSize[0] / 2, point[1] - size.contentSize[1] * 1.12],
    formatter: (params: any) => {
      return `<div style="position: relative;background: #333;color: #fff;padding: 2px 10px;border-radius: 4px;font-size: 11px;font-weight: 400;line-height: 1.4;">
        ${params.value}개
        <div style="position: absolute;bottom: -3px;left: 43%;width: 0;height: 0;border-left: 4px solid transparent;border-right: 4px solid transparent;border-top: 4px solid #333;"></div>
      </div>`;
    }
  },
  xAxis: [
    {
      type: 'category',
      axisLine: { show: true, lineStyle: { width: 1, color: '#AAA' } },
      data: [] as { value: string; textStyle: { color: string; fontSize: number; fontFamily: string; fontWeight: number } }[]
    }
  ],
  yAxis: {
    type: 'value',
    show: true,
    axisLabel: { fontSize: 11, fontFamily: 'Prtendard', fontWeight: 400, color: '#AAA' },
    splitLine: { lineStyle: { width: 1, color: '#AAA' } }
  },
  series: [
    {
      type: 'bar',
      itemStyle: { color: '#FF957B', borderRadius: [2, 2, 0, 0] },
      barWidth: '10px',
      data: [] as number[]
    }
  ]
});

const handleDate = () => {
  resetOption();

  props.dailySpamStats?.forEach((spamStat) => {
    option.value.xAxis[0].data.push({
      value: `${formatDate(spamStat.date, 'mmdd')}`,
      textStyle: { color: '#333', fontSize: 11, fontFamily: 'Pretendard', fontWeight: 400 }
    });

    option.value.series[0].data.push(spamStat.spam_count);
  });
};

const resetOption = () => {
  option.value.xAxis[0].data = [];
  option.value.series[0].data = [];
};

onMounted(handleDate);
watch(() => props.dailySpamStats, handleDate);
</script>

<template>
  <BarChart :option="option" />
</template>
