import * as React from 'react';
import CommonContext, {defaultStockInfo} from '@/app/context/common-context';
import {StockInfo} from '@/app/api/get-tw-stock-info';
import {DEFAULT_YEAR} from '@/app/const';

export interface CommonProviderProps {
  children: React.ReactNode;
}

const CommonProvider: React.FC<CommonProviderProps> = (props) => {
  const [currentStockInfo, setCurrentStockInfo] = React.useState<StockInfo>(defaultStockInfo);
  const [selectYear, setSelectYear] = React.useState<number>(DEFAULT_YEAR);

  const value = React.useMemo(() => {
    return {
      selectYear,
      setSelectYear,
      currentStockInfo,
      setCurrentStockInfo,
    };
  }, [currentStockInfo, selectYear]);

  return (
    <CommonContext.Provider value={value}>
      {props.children}
    </CommonContext.Provider>
  );
};

export default CommonProvider;