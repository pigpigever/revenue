'use client';
import * as React from 'react';
import Navbar from '@/app/components/navbar';
import Search from '@/app/components/search';
import {Box, Container} from '@mui/material';
import CompanyInfo from '@/app/components/company-info';
import ChartPanel from '@/app/components/chart/panel';
import RevenueDetail from '@/app/components/revenue-detail';
import getTwStockInfo, {StockInfo} from '@/app/api/get-tw-stock-info';
import {getUniqueArray} from '@/app/utils';
import CommonProvider from '@/app/context/common-provider';
import {useCommonContext} from '@/app/context/common-context';
import useMonthRevenueDataFetch from '@/app/hooks/use-month-revenue-data-fetch';
import RevenueProvider from '@/app/context/revenue-provider';
import {useRevenueContext} from '@/app/context/revenue-context';

const Home = () => {
  const {currentStockInfo, setCurrentStockInfo, setSelectYear} = useCommonContext();
  const {loading} = useRevenueContext();
  const [results, setResults] = React.useState<StockInfo[]>([]);

  useMonthRevenueDataFetch();

  const handleSearch = async (value: string) => {
    try {
      const res = await getTwStockInfo();
      const stockList = res.data ?? [];
      const results = stockList.filter(stock => {
        return stock.stock_id.startsWith(value) || stock.stock_name.includes(value);
      });
      setResults(getUniqueArray(results, 'stock_id'));
    } catch (e) {
      console.error('handle search error', e);
    }
  };

  const handleSelect = (stock: StockInfo) => {
    setCurrentStockInfo(stock);
  };


  return (
    <>
      <Navbar>
        <Search
          searchResults={results}
          onSearch={handleSearch}
          onSelect={handleSelect}
        />
      </Navbar>
      <Container
        maxWidth="md"
        sx={{marginTop: '16px',}}
      >
        <CompanyInfo
          name={currentStockInfo?.stock_name}
          ticker={currentStockInfo?.stock_id}
        />
        <Box sx={{marginTop: '16px'}}>
          <ChartPanel
            loading={loading}
            onYearChange={year => setSelectYear(year)}
          />
        </Box>
        <Box sx={{marginTop: '16px'}}>
          <RevenueDetail />
        </Box>
      </Container>
    </>
  );
};

const HomeWrapper = () => {
  return (
    <CommonProvider>
      <RevenueProvider>
        <Home />
      </RevenueProvider>
    </CommonProvider>
  );
};

export default HomeWrapper;