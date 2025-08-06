import * as React from 'react';
import {Card} from '@mui/material';

export interface CompanyInfoProps {
  name: string;
  ticker: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = (props) => {
  return (
    <Card
      variant="outlined"
      sx={{padding: '16px', fontSize: '18px', fontWeight: 700}}
    >
      <span>{props.name}&nbsp;</span>
      <span>({props.ticker})</span>
    </Card>
  );
};

export default CompanyInfo;