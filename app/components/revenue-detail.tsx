'use client';
import {Box, Card, CircularProgress, Grid, Typography} from '@mui/material';
import * as React from 'react';
import RevenueTable, {RevenueTableHandle} from './revenue-table';
import TabSwitcher, { RevenueMetricKey } from './tab-switcher';
import {useRevenueContext} from '@/app/context/revenue-context';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const TableEmpty = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={168}
      borderRadius={2}
    >
      <InsertChartOutlinedIcon sx={{ fontSize: 48, color: '#bdbdbd', mb: 1 }} />
      <Typography variant="subtitle1" color="text.secondary">
        暫無詳細數據
      </Typography>
    </Box>
  );
};

const RevenueDetail = () => {
  const [selectedTab, setSelectedTab] = React.useState<RevenueMetricKey>('DetailData');
  const {loading, xAxisData: dates, revenueMonthList, yoyGrowth} = useRevenueContext();
  const tableRef = React.useRef<RevenueTableHandle | null>(null);

  React.useLayoutEffect(() => {
    if (revenueMonthList.length) {
      tableRef.current?.scrollToRight();
    }
  }, [revenueMonthList.length]);

  return (
    <Card variant="outlined">
      <Box sx={{padding: '16px 16px 0'}}>
        <TabSwitcher
          tabs={[
            { key: 'DetailData', label: '詳細數據' },
          ]}
          selectedTab={selectedTab}
          onChange={setSelectedTab}
        />
      </Box>
      <Box sx={{marginTop: '16px'}}>
        {loading ? (
          <Box
            height={164}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={32} />
          </Box>
        ) : (
          <>
            {dates.length ? (
              <RevenueTable
                ref={tableRef}
                dates={dates}
                revenue={revenueMonthList}
                yoy={yoyGrowth}
              />
            ) : (
              <TableEmpty />
            )}
          </>
        )}
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
          '& p': {
            margin: 0
          }
        }}
      >
        <p>表格單位：千元，數據來自公開資訊觀測站</p>
        <p>網頁圖表歡迎轉貼引用，請註明出處為財報狗</p>
      </Grid>
    </Card>
  );
};

export default RevenueDetail;