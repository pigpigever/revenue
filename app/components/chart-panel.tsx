'use client';

import {Card, Grid, MenuItem, Select, SelectChangeEvent,} from '@mui/material';
import * as React from 'react';
import RevenueECharts from './revenue-charts';
import TabSwitcher, {RevenueMetricKey} from './tab-switcher';

const ChartPanel = () => {
  const [selectedTab, setSelectedTab] = React.useState<RevenueMetricKey>('MonthlyRevenue');
  const [selectedDate, setSelectedDate] = React.useState<number>(0);;

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <Card variant="outlined" sx={{position: 'relative'}}>
      <Grid
        container
        direction="row"
        sx={{
          padding: '16px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TabSwitcher
          tabs={[
            { key: 'MonthlyRevenue', label: '每月營收' },
            { key: 'MonthlyRevenuePerShare', label: '月每股營收' },
          ]}
          selectedTab={selectedTab}
          onChange={setSelectedTab}
        />
        <Select
          autoWidth
          value={selectedDate}
          size="small"
          onChange={handleSelectChange}
        >
          <MenuItem value={0}>近 3 年</MenuItem>
          <MenuItem value={1}>近 5 年</MenuItem>
          <MenuItem value={2}>近 8 年</MenuItem>
        </Select>
      </Grid>

      <RevenueECharts />
    </Card>
  );
};

export default ChartPanel;
