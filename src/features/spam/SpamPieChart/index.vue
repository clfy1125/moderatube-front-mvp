<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import PieChart from '@/shared/echarts/PieChart/index.vue';

interface ISpamPieChartProps {
  comments: {
    reviewedComments?: number;
    unreviewedComments?: number;
  };
}

defineOptions({ name: 'SpamPieChart' });
const props = defineProps<ISpamPieChartProps>();

const option = ref({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'transparent',
    borderWidth: 0,
    extraCssText: 'box-shadow:none;',
    position: (point: number[], _params: any, _dom: any, _rect: any, size: { viewSize: number[]; contentSize: number[] }) => [point[0] - size.contentSize[0] / 2, point[1] - size.contentSize[1] * 1.12],
    formatter: (params: any) => {
      return `<div style="position: relative;background: #333;color: #fff;padding: 2px 10px;border-radius: 4px;font-size: 11px;font-weight: 400;line-height: 1.4;">
        ${params.name}: ${params.value}
        <div style="position: absolute;bottom: -3px;left: 43%;width: 0;height: 0;border-left: 4px solid transparent;border-right: 4px solid transparent;border-top: 4px solid #333;"></div>
      </div>`;
    }
  },

  legend: {
    orient: 'vertical',
    top: 'middle',
    right: '2%',
    data: [
      {
        name: '검사완료 댓글',
        textStyle: {
          fontSize: 12,
          fontFamily: 'Pretendard',
          fontWeight: 400,
          lineHeight: 16,
          color: '#333'
        }
      },
      {
        name: '미검사 댓글',
        textStyle: {
          fontSize: 12,
          fontFamily: 'Pretendard',
          fontWeight: 400,
          lineHeight: 16,
          color: '#333'
        }
      }
    ]
  },
  series: [
    {
      type: 'pie',
      radius: '100%',
      center: ['32%', '50%'],
      label: {
        position: 'inner',
        fontSize: 14,
        fontFamily: 'Pretendard',
        fontWeight: 600,
        formatter: (params: any) => {
          if (params.dataIndex === 0) return `{black|${params.percent}%}`;

          return `{white|${params.percent}%}`;
        },

        rich: {
          white: {
            color: '#fff',
            fontSize: 14,
            fontFamily: 'Pretendard',
            fontWeight: 600
          },
          black: {
            color: '#333',
            fontSize: 14,
            fontFamily: 'Pretendard',
            fontWeight: 600
          }
        }
      },
      labelLine: { show: false },
      emphasis: { disabled: true },
      data: [] as { value: number; name: string; itemStyle: { color: string } }[]
    }
  ]
});

const handleData = () => {
  if (props.comments.reviewedComments === undefined || props.comments.unreviewedComments === undefined) return;

  option.value.series[0].data[0] = { value: props.comments.reviewedComments, name: '검사완료 댓글', itemStyle: { color: '#EEEEEE' } };
  option.value.series[0].data[1] = { value: props.comments.unreviewedComments, name: '미검사 댓글', itemStyle: { color: '#FF957B' } };
};

onMounted(handleData);
watch(() => props.comments, handleData);
</script>

<template>
  <PieChart :option="option" />
</template>
