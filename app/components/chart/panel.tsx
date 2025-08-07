'use client';

import {Box, Card, CircularProgress, Grid, MenuItem, Select, SelectChangeEvent,} from '@mui/material';
import * as React from 'react';
import RevenueECharts from './revenue-chart';
import TabSwitcher, {RevenueMetricKey} from '../tab-switcher';
import {DEFAULT_YEAR, EIGHT_YEAR, FIVE_YEAR} from '@/app/const';
import {useRevenueContext} from '@/app/context/revenue-context';

export interface ChartPanelProps {
  loading: boolean;
  onYearChange: (year: number) => void;
}

const Panel: React.FC<ChartPanelProps> = (props) => {
  const [selectedTab, setSelectedTab] = React.useState<RevenueMetricKey>('MonthlyRevenue');
  const [selectedDate, setSelectedDate] = React.useState<number>(DEFAULT_YEAR);
  const {revenueMonthList, xAxisData, yoyGrowth} = useRevenueContext();

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const year = event.target.value;
    setSelectedDate(year);
    props.onYearChange(year);
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
            {key: 'MonthlyRevenue', label: '每月營收'},
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
          <MenuItem value={DEFAULT_YEAR}>近 3 年</MenuItem>
          <MenuItem value={FIVE_YEAR}>近 5 年</MenuItem>
          <MenuItem value={EIGHT_YEAR}>近 8 年</MenuItem>
        </Select>
      </Grid>
      {props.loading ? (
        <Box
          height={300}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={32} />
        </Box>
      ) : (
        <RevenueECharts
          data={revenueMonthList}
          xAxisData={xAxisData}
          yoyGrowth={yoyGrowth}
        />
      )}
    </Card>
  );
};

export default Panel;
