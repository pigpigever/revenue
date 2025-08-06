'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import {EChartsOption} from 'echarts-for-react/src/types';

const data = [
  { month: '2021/01', revenue: 900, price: 140 },
  { month: '2021/02', revenue: 850, price: 130 },
  { month: '2021/03', revenue: 1000, price: 160 },
  { month: '2021/04', revenue: 950, price: 155 },
  { month: '2021/05', revenue: 1100, price: 180 },
  { month: '2021/06', revenue: 1200, price: 200 },
  { month: '2021/07', revenue: 1300, price: 240 },
  { month: '2021/08', revenue: 1250, price: 230 },
  { month: '2021/09', revenue: 1400, price: 260 },
  { month: '2021/10', revenue: 1450, price: 300 },
  { month: '2021/11', revenue: 1500, price: 320 },
  { month: '2021/12', revenue: 1600, price: 350 },
  { month: '2022/01', revenue: 900, price: 140 },
  { month: '2022/02', revenue: 850, price: 130 },
  { month: '2022/03', revenue: 1000, price: 160 },
  { month: '2022/04', revenue: 950, price: 155 },
  { month: '2022/05', revenue: 1100, price: 180 },
  { month: '2022/06', revenue: 1200, price: 200 },
  { month: '2022/07', revenue: 1300, price: 240 },
  { month: '2022/08', revenue: 1250, price: 230 },
  { month: '2022/09', revenue: 1400, price: 260 },
  { month: '2022/10', revenue: 1450, price: 300 },
  { month: '2022/11', revenue: 1500, price: 320 },
  { month: '2022/12', revenue: 1600, price: 350 },
  { month: '2023/01', revenue: 900, price: 140 },
  { month: '2023/02', revenue: 850, price: 130 },
  { month: '2023/03', revenue: 1000, price: 160 },
  { month: '2023/04', revenue: 950, price: 155 },
  { month: '2023/05', revenue: 1100, price: 180 },
  { month: '2023/06', revenue: 1200, price: 200 },
  { month: '2023/07', revenue: 1300, price: 240 },
  { month: '2023/08', revenue: 1250, price: 230 },
  { month: '2023/09', revenue: 1400, price: 260 },
  { month: '2023/10', revenue: 1450, price: 300 },
  { month: '2023/11', revenue: 1500, price: 320 },
  { month: '2023/12', revenue: 1600, price: 350 },
  { month: '2024/01', revenue: 900, price: 140 },
  { month: '2024/02', revenue: 850, price: 130 },
  { month: '2024/03', revenue: 1000, price: 160 },
  { month: '2024/04', revenue: 950, price: 155 },
  { month: '2024/05', revenue: 1100, price: 180 },
  { month: '2024/06', revenue: 1200, price: 200 },
  { month: '2024/07', revenue: 1300, price: 240 },
  { month: '2024/08', revenue: 1250, price: 230 },
  { month: '2024/09', revenue: 1400, price: 260 },
  { month: '2024/10', revenue: 1450, price: 300 },
  { month: '2024/11', revenue: 1500, price: 320 },
  { month: '2024/12', revenue: 1600, price: 350 },
];

const months = data.map((d) => d.month);
const revenues = data.map((d) => d.revenue);
const prices = data.map((d) => d.price);

const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#000',
    textStyle: {
      color: '#fff'
    },
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  grid: {
    left: '60',
    right: '60',
    bottom: '60',
    top: '60',
  },
  legend: {
    bottom: 10,
    data: ['每月營收', '月均價'],
  },
  xAxis: [
    {
      type: 'category',
      data: months,
      splitLine: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          type: 'solid',
          color: '#ccc'
        }
      },
      axisLabel: {
        color: '#666',
        formatter: (value: string) => value.slice(0, 4),
        interval: (index: number, value: string) => {
          if (index > 0) {
            const prev = data[index - 1];
            const prevYear = prev.month.slice(0, 4);
            const year = value.slice(0, 4);
            if (prevYear !== year) {
              return true;
            }
          }
          return false;
        }
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          type: 'solid'
        }
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '元',
      position: 'left',
      axisLine: { show: false },
      axisTick: { show: false },
      axisPointer: {show: false },
      splitLine: { lineStyle: { type: 'solid' } },
    },
    {
      type: 'value',
      name: '股價',
      position: 'right',
      axisPointer: {show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: '每月營收',
      type: 'bar',
      data: revenues,
      yAxisIndex: 0,
      itemStyle: {
        color: '#f4dcab',
      },
      emphasis: {
        itemStyle: {
          color: '#f4dcab' // 悬浮时颜色一致，避免改变
        },
      },
      barWidth: '40%',
    },
    {
      name: '月均價',
      type: 'line',
      data: prices,
      yAxisIndex: 1,
      lineStyle: {
        color: '#c14444',
        width: 2,
      },
      itemStyle: {
        opacity: 0,
        color: '#c14444',
      },
      symbol: 'circle',
      symbolSize: 8,
      showSymbol: false,
      emphasis: {
        itemStyle: {
          opacity: 1,
          shadowBlur: 10,
          shadowColor: '#c14444',
          borderColor: '#fff',
          borderWidth: 1,
          color: '#c14444'
        }
      },

    },
  ],
};

const RevenueECharts = () => {
  return <ReactECharts option={options} style={{ width: '100%', height: 450 }} />;
};

export default RevenueECharts;
