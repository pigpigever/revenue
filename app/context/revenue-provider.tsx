import * as React from 'react';
import RevenueContext, {YoyGrowthItem} from './revenue-context';
import {RevenueMonthItem} from '@/app/api/get-tw-stock-month-revenue';

export interface RevenueProviderProps {
  children: React.ReactNode;
}

const RevenueProvider: React.FC<RevenueProviderProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [xAxisData, setXAxisData] = React.useState<string[]>([]);
  const [revenueMonthList, setRevenueMonthList] = React.useState<RevenueMonthItem[]>([]);
  const [yoyGrowth, setYoyGrowth] = React.useState<YoyGrowthItem[]>([]);

  const value = React.useMemo(() => {
    return {
      loading,
      setLoading,
      xAxisData,
      setXAxisData,
      yoyGrowth,
      setYoyGrowth,
      revenueMonthList,
      setRevenueMonthList
    };
  }, [loading, revenueMonthList, xAxisData, yoyGrowth]);

  return (
    <RevenueContext.Provider value={value}>
      {props.children}
    </RevenueContext.Provider>
  );
};

export default RevenueProvider;