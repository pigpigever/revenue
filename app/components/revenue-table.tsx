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

type RevenueTableProps = {
  dates: string[];
  revenue: string[];
  yoy: string[];
};

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

const RevenueTable: React.FC<RevenueTableProps> = ({ dates, revenue, yoy }) => {
  return (
    <TableContainer component={Box} sx={{ maxHeight: 440, overflow: 'auto' }}>
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
            {revenue.map((val, idx) => (
              <TableCell
                key={idx}
                align="center"
                sx={cellBorderStyle(idx === 0)}
              >
                {val}
              </TableCell>
            ))}
          </TableRow>

          {/* 年增率 Row */}
          <TableRow>
            <TableCell sx={stickyLeftCellStyle('#f6f8fa')}>
              單月營收年增率 (%)
            </TableCell>
            {yoy.map((val, idx) => (
              <TableCell
                key={idx}
                align="center"
                sx={{
                  ...cellBorderStyle(idx === 0),
                  backgroundColor: '#f6f8fa',
                }}
              >
                {val}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RevenueTable;
