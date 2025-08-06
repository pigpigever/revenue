import * as React from 'react';
import {useCommonContext} from '@/app/context/common-context';
import getTwStockMonthMonthRevenue from '@/app/api/get-tw-stock-month-revenue';

const useMonthRevenue = () => {
  const {currentStockInfo, startTime, endTime} = useCommonContext();

  React.useEffect(() => {
    const params = {start_date: startTime, end_date: endTime, data_id: currentStockInfo.stock_id};
    getTwStockMonthMonthRevenue(params).then((res) => {
      console.log('monthRevenue', res);
    });
  }, [currentStockInfo.stock_id, endTime, startTime]);
};

export default useMonthRevenue;