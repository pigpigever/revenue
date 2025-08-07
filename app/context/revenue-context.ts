import * as React from 'react';
import {RevenueMonthItem} from '@/app/api/get-tw-stock-month-revenue';

export type YoyGrowthItem = {
  revenue_year: number;
  revenue_month: number;
  value: string;
}

const RevenueContext = React.createContext<{
  loading: boolean;
  setLoading: (loading: boolean) => void;
  xAxisData: string[];
  setXAxisData: (xAxisData: string[]) => void;
  yoyGrowth: YoyGrowthItem[];
  setYoyGrowth: (value: YoyGrowthItem[]) => void;
  revenueMonthList: RevenueMonthItem[];
  setRevenueMonthList: (revenueMonthList: RevenueMonthItem[]) => void;
}>({
  loading: false,
  setLoading: ()=> {},
  xAxisData: [],
  setXAxisData: () => {},
  yoyGrowth: [],
  setYoyGrowth: () => {},
  revenueMonthList: [],
  setRevenueMonthList: () => {},
});

export const useRevenueContext = () => {
  return React.useContext(RevenueContext);
};

export default RevenueContext;