'use client';
import {Box, Card, Grid} from '@mui/material';
import * as React from 'react';
import RevenueTable from './revenue-table';
import TabSwitcher, { RevenueMetricKey } from './tab-switcher';

const RevenueDetail = () => {
  const [selectedTab, setSelectedTab] = React.useState<RevenueMetricKey>('MonthlyRevenue');

  return (
    <Card variant="outlined">
      <Box sx={{padding: '16px 16px 0'}}>
        <TabSwitcher
          tabs={[
            { key: 'MonthlyRevenue', label: '詳細數據' },
            { key: 'MonthlyRevenuePerShare', label: '指標解釋' },
          ]}
          selectedTab={selectedTab}
          onChange={setSelectedTab}
        />
      </Box>
      <Box sx={{marginTop: '16px'}}>
        <RevenueTable
          dates={[
            '2020/01', '2020/02', '2020/03', '2020/04', '2020/05',
            '2020/06', '2020/07', '2020/08', '2020/09', '2020/10',
          ]}
          revenue={[
            '103,683,135', '93,394,449', '113,519,599', '96,001,572', '93,819,010',
            '108,234,567', '112,456,789', '115,678,901', '109,345,678', '120,123,456',
          ]}
          yoy={[
            '32.77', '53.38', '42.40', '28.53', '16.64',
            '22.18', '25.60', '30.12', '27.90', '35.25',
          ]}
        />
      </Box>
      <Grid
        container
        direction="column"
        sx={{
          margin: '16px',
          textAlign: 'right',
          fontSize: '13px',
          lineHeight: '180%',
          color: '#434343',
        }}
      >
        <p>表格單位：千元，數據來自公開資訊觀測站</p>
        <p>網頁圖表歡迎轉貼引用，請註明出處為財報狗</p>
      </Grid>
    </Card>
  );
};

export default RevenueDetail;