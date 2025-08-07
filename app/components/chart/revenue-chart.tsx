'use client';

import * as React from 'react';
import {EChartsOption} from 'echarts-for-react/src/types';
import echarts from './echarts';
import dynamic from 'next/dynamic';
import {Box, CircularProgress, Typography} from '@mui/material';
import {RevenueMonthItem} from '@/app/api/get-tw-stock-month-revenue';
import {extractYearFromStr, formatNumberWithUnit} from '@/app/utils';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import {YoyGrowthItem} from '@/app/context/revenue-context';

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  {
    ssr: false,
    loading: () => (
      <Box
        height={300}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={32} />
      </Box>
    ),
  }
);

export interface RevenueEChartsProps {
  data: RevenueMonthItem[];
  xAxisData: string[];
  yoyGrowth: YoyGrowthItem[];
}

const ChartEmpty = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={300}
      borderRadius={2}
    >
      <InsertChartOutlinedIcon sx={{ fontSize: 48, color: '#bdbdbd', mb: 1 }} />
      <Typography variant="subtitle1" color="text.secondary">
        暫無圖表資料
      </Typography>
    </Box>
  );
};


const RevenueECharts: React.FC<RevenueEChartsProps> = (props) => {
  // 每月营收
  const revenues = React.useMemo(() => {
    return props.data.map((d) => d.revenue);
  }, [props.data]);

  const options: EChartsOption = React.useMemo(() => {
    return {
      grid: {
        left: '76',
        right: '60',
        bottom: '60',
        top: '10',
      },
      legend: {
        bottom: 10,
        data: ['每月營收', '單月營收年增率(%)'],
        itemStyle: {
          borderWidth: 0
        },
      },
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
      xAxis: [
        {
          type: 'category',
          data: props.xAxisData,
          splitLine: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              type: 'solid',
              color: '#ccc'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eab5bb',
              width: 2
            }
          },
          axisLabel: {
            color: '#666',
            formatter: (date: string) => extractYearFromStr(date),
            interval: (index: number, value: string) => {
              if (index > 0) {
                const prev = props.xAxisData[index - 1];
                const prevYear = extractYearFromStr(prev);
                const year = extractYearFromStr(value);
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
          axisLabel: {
            formatter: (value: number) => formatNumberWithUnit(value),
          }
        },
        {
          type: 'value',
          name: '%',
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
            borderColor: '#e3a72e',
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              color: '#f4dcab'
            },
          },
          barWidth: '50%',
        },
        {
          name: '單月營收年增率(%)',
          type: 'line',
          data: props.yoyGrowth,
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
  }, [props.xAxisData, props.yoyGrowth, revenues]);

  if (!props.data || !props.data.length) {
    return <ChartEmpty />;
  }
  return (
    <ReactECharts
      echarts={echarts}
      option={options}
      style={{ width: '100%', height: 450 }}
    />
  );
};

export default RevenueECharts;
