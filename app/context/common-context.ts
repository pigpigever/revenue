import * as React from 'react';
import {StockInfo} from '@/app/api/get-tw-stock-info';

export const defaultStockInfo = {
  date: '',
  industry_category: '',
  stock_id: '2330',
  stock_name: '台積電',
  type: ''
};

const CommonContext = React.createContext<{
  startTime: string;
  endTime: string;
  currentStockInfo: StockInfo;
  setCurrentStockInfo: (currentStockInfo: StockInfo) => void;
}>({
  startTime: '',
  endTime: '',
  currentStockInfo: defaultStockInfo,
  setCurrentStockInfo: () => {}
});

export const useCommonContext = () => {
  return React.useContext(CommonContext);
};

export default CommonContext;