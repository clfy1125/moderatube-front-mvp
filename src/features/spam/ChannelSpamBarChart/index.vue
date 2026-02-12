<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import BarChart from '@/shared/echarts/BarChart/index.vue';
import { formatDate } from '@/shared/utils/formatDate';

interface IChannelSpamBarChartProps {
  dailyData: {
    date: string;
    total_comments: number;
    spam_comments: number;
    spam_ratio: number;
  }[];
}

const props = defineProps<IChannelSpamBarChartProps>();
defineOptions({ name: 'ChannelSpamBarChart' });

const option = ref({
  grid: { top: 0, bottom: 0, left: 0, right: 0 },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'transparent',
    borderWidth: 0,
    extraCssText: 'box-shadow:none;',
    position: (point: number[], _params: any, _dom: any, _rect: any, size: { viewSize: number[]; contentSize: number[] }) => [point[0] - size.contentSize[0] / 2, point[1] - size.contentSize[1] * 1.12],
    formatter: (params: any) => {
      return `<div style="position: relative;background: #333;color: #fff;padding: 2px 10px;border-radius: 4px;font-size: 11px;font-weight: 400;line-height: 1.4;">
        ${params.data.spam}개 / ${params.data.total}개
        <div style="position: absolute;bottom: -3px;left: 43%;width: 0;height: 0;border-left: 4px solid transparent;border-right: 4px solid transparent;border-top: 4px solid #333;"></div>
      </div>`;
    }
  },
  xAxis: { type: 'value', show: false, max: 100 },
  yAxis: [
    {
      type: 'category',
      axisLine: { show: false },
      data: [] as { value: string; textStyle: { color: string; fontSize: number; fontFamily: string; fontWeight: number } }[]
    },
    {
      type: 'category',
      axisLine: { show: false },
      data: [] as { value: string; textStyle: { color: string; fontSize: number; fontFamily: string; fontWeight: number } }[]
    }
  ],
  series: [
    {
      type: 'bar',
      itemStyle: { color: '#FF957B', borderRadius: 2 },
      showBackground: true,
      barWidth: '14px',
      barCategoryGap: '17px',
      backgroundStyle: { color: '#EEEEEE', borderRadius: 2 },
      data: [] as { value: number; spam: number; total: number }[]
    }
  ]
});

const handleDate = () => {
  option.value.yAxis[0].data = [];
  option.value.yAxis[1].data = [];
  option.value.series[0].data = [];

  props.dailyData.forEach((data) => {
    option.value.yAxis[0].data.push({
      value: `${formatDate(data.date, 'mmdd')}`,
      textStyle: {
        color: '#333',
        fontSize: 11,
        fontFamily: 'Pretendard',
        fontWeight: 400
      }
    });

    option.value.yAxis[1].data.push({
      value: `${data.spam_ratio}%`,
      textStyle: {
        color: '#222',
        fontSize: 11,
        fontFamily: 'Pretendard',
        fontWeight: 600
      }
    });

    option.value.series[0].data.push({
      value: data.spam_ratio,
      spam: data.spam_comments,
      total: data.total_comments
    });
  });
};

onMounted(handleDate);
watch(() => props.dailyData, handleDate);
</script>

<template>
  <BarChart :option="option" />
</template>
