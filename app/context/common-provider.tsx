import * as React from 'react';
import CommonContext, {defaultStockInfo} from '@/app/context/common-context';
import {StockInfo} from '@/app/api/get-tw-stock-info';
import {getTime} from '@/app/utils';
import {DEFAULT_YEAR} from '@/app/const';

export interface CommonProviderProps {
  children: React.ReactNode;
}

const CommonProvider: React.FC<CommonProviderProps> = (props) => {
  const [currentStockInfo, setCurrentStockInfo] = React.useState<StockInfo>(defaultStockInfo);

  const value = React.useMemo(() => {
    return {
      ...getTime(DEFAULT_YEAR),
      currentStockInfo,
      setCurrentStockInfo,
    };
  }, [currentStockInfo]);

  return (
    <CommonContext.Provider value={value}>
      {props.children}
    </CommonContext.Provider>
  );
};

export default CommonProvider;