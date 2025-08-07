import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {RevenueMonthItem} from '@/app/api/get-tw-stock-month-revenue';
import {YoyGrowthItem} from '@/app/context/revenue-context';
import {addThousandsSeparator} from '@/app/utils';

export type RevenueTableProps = {
  dates: string[];
  revenue: RevenueMonthItem[];
  yoy: YoyGrowthItem[];
};

export type RevenueTableHandle = {
  scrollToRight: () => void;
}

// 公共样式提取
const stickyLeftCellStyle = (bgColor: string = '#fff', zIndex = 1) => ({
  position: 'sticky',
  left: 0,
  backgroundColor: bgColor,
  zIndex,
  whiteSpace: 'nowrap',
  '&::before': {
    content: '""',
    position: 'absolute',
    right: '-4px',
    top: '-1px',
    bottom: '-1px',
    width: '4px',
    backgroundColor: '#fff',
    borderLeft: '1px solid #e3e3e3',
    borderRight: '1px solid #e3e3e3',
  }
});

const cellBorderStyle = (hasLeftBorder: boolean, hasTopBorder = false) => ({
  borderTop: hasTopBorder ? '1px solid #e3e3e3' : 'none',
  borderLeft: hasLeftBorder ? '1px solid #e3e3e3' : 'none',
  borderRight: '1px solid #e3e3e3',
});

const RevenueTable = React.forwardRef<RevenueTableHandle, RevenueTableProps>(({ dates, revenue, yoy }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => {
    return {
      scrollToRight: () => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
      }
    };
  });

  return (
    <TableContainer
      ref={containerRef}
      component={Box}
      sx={{
        maxHeight: 440,
        overflow: 'auto'
      }}
    >
      <Table stickyHeader sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                ...stickyLeftCellStyle('#f6f8fa', 3),
                borderTop: '1px solid #e3e3e3',
                fontWeight: 'bold',
              }}
            >
              年度 / 月份
            </TableCell>
            {dates.map((date, idx) => (
              <TableCell
                key={date}
                align="center"
                sx={{
                  ...cellBorderStyle(idx === 0, true),
                  fontWeight: 'bold',
                  backgroundColor: '#f5f7fa',
                }}
              >
                {date}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* 每月營收 Row */}
          <TableRow>
            <TableCell sx={stickyLeftCellStyle()}>
              每月營收
            </TableCell>
            {revenue.map((item, idx) => (
              <TableCell
                key={idx}
                align="center"
                sx={cellBorderStyle(idx === 0)}
              >
                {addThousandsSeparator((item.revenue / 1000).toString())}
              </TableCell>
            ))}
          </TableRow>

          {/* 年增率 Row */}
          <TableRow>
            <TableCell sx={stickyLeftCellStyle('#f6f8fa')}>
              單月營收年增率 (%)
            </TableCell>
            {yoy.map((item, idx) => (
              <TableCell
                key={idx}
                align="center"
                sx={{
                  ...cellBorderStyle(idx === 0),
                  backgroundColor: '#f6f8fa',
                }}
              >
                {item.value}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
});

RevenueTable.displayName = 'RevenueTable';

export default RevenueTable;
