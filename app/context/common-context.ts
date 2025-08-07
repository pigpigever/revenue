import * as React from 'react';
import {StockInfo} from '@/app/api/get-tw-stock-info';
import {DEFAULT_YEAR} from '@/app/const';

export const defaultStockInfo = {
  date: '',
  industry_category: '',
  stock_id: '2330',
  stock_name: '台積電',
  type: ''
};

const CommonContext = React.createContext<{
  selectYear: number;
  setSelectYear: (year: number) => void;
  currentStockInfo: StockInfo;
  setCurrentStockInfo: (currentStockInfo: StockInfo) => void;
}>({
  selectYear: DEFAULT_YEAR + 1,
  setSelectYear: () => {},
  currentStockInfo: defaultStockInfo,
  setCurrentStockInfo: () => {}
});

export const useCommonContext = () => {
  return React.useContext(CommonContext);
};

export default CommonContext;