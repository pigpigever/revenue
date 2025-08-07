import * as React from 'react';
import {useCommonContext} from '@/app/context/common-context';
import getTwStockMonthMonthRevenue, {RevenueMonthItem} from '@/app/api/get-tw-stock-month-revenue';
import {getOriginTime, getTime} from '@/app/utils';
import {useRevenueContext} from '@/app/context/revenue-context';

type OriginTime = {
  originMonth: number;
  originYear: number;
}

const useMonthRevenueDataFetch = () => {
  const {currentStockInfo, selectYear} = useCommonContext();
  const {setRevenueMonthList, setXAxisData, setYoyGrowth, setLoading} = useRevenueContext();

  // 计算单月年增长率
  const getYoyGrowth = React.useCallback((data: RevenueMonthItem[], originTime: OriginTime) => {
    return data
      .map((item) => {
        for (let i = 0; i < data.length; i++) {
          const compareItem = data[i];
          const hasRate = compareItem.revenue_month === item.revenue_month
            && item.revenue_year - 1 === compareItem.revenue_year;
          // 满足条件就直接 return
          if (hasRate) {
            const value = (item.revenue / compareItem.revenue - 1) * 100;
            return {
              revenue_year: item.revenue_year,
              revenue_month: item.revenue_month,
              value: value.toFixed(2)
            };
          }
        }
        return {
          revenue_year: item.revenue_year,
          revenue_month: item.revenue_month,
          value: '0'
        };
      })
      // 需要过滤前面多出来一年的数据，否则展示上会有问题
      .filter(d => {
        const {originYear, originMonth} = originTime;
        return d.revenue_year > originYear || d.revenue_year === originYear && d.revenue_month >= originMonth;
      });
  }, []);

  // 计算 X 坐标数据
  const getXAxisData = React.useCallback((data: RevenueMonthItem[], originTime: OriginTime) => {
    return data
      .filter(d => {
        const {originYear, originMonth} = originTime;
        return d.revenue_year > originYear || d.revenue_year === originYear && d.revenue_month >= originMonth;
      })
      .map((d) => {
        return `${d.revenue_year}/${d.revenue_month.toString().padStart(2, '0')}`;
      });
  }, []);

  // 拉取股票数据
  const fetchMonthRevenueData = React.useCallback(async () => {
    try {
      // 额外多一年，用于计算增长率
      const {startTime, endTime} = getTime(selectYear + 1);
      const params = {start_date: startTime, end_date: endTime, data_id: currentStockInfo.stock_id};
      setLoading(true);
      const res = await getTwStockMonthMonthRevenue(params);
      // 原始数据
      const data = res.data ?? [];
      const time = getTime(selectYear);
      const originTime = getOriginTime(time.startTime, time.endTime);
      // x 轴数据
      const xAxisData = getXAxisData(data, originTime);
      //单月年增长率
      const yoyGrowth = getYoyGrowth(data, originTime);
      const revenueMonthList = data.filter(d => {
        const {originYear, originMonth} = originTime;
        return d.revenue_year > originYear || d.revenue_year === originYear && d.revenue_month >= originMonth;
      });
      setRevenueMonthList(revenueMonthList);
      setXAxisData(xAxisData);
      setYoyGrowth(yoyGrowth);
    } catch (e) {
      console.error('fetch month revenue error', e);
    } finally {
      setLoading(false);
    }
  }, [currentStockInfo.stock_id, getXAxisData, getYoyGrowth, selectYear, setLoading, setRevenueMonthList, setXAxisData, setYoyGrowth]);

  React.useEffect(() => {
    fetchMonthRevenueData();
  }, [fetchMonthRevenueData]);
};

export default useMonthRevenueDataFetch;