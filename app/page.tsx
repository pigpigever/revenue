import Navbar from '@/app/components/navbar';
import Search from '@/app/components/search';
import {Box, Container} from '@mui/material';
import CompanyInfo from '@/app/components/company-info';
import ChartPanel from '@/app/components/chart-panel';
import RevenueDetail from '@/app/components/revenue-detail';

export default function Home() {
  return (
    <>
      <Navbar>
        <Search
          onSearch={value => {
            console.log(value);
          }}
        />
      </Navbar>
      <Container
        maxWidth="md"
        sx={{marginTop: '16px',}}
      >
        <CompanyInfo name={'台积电'} ticker={'666'} />
        <Box sx={{marginTop: '16px'}}>
          <ChartPanel />
        </Box>
        <Box sx={{marginTop: '16px'}}>
          <RevenueDetail />
        </Box>
      </Container>
    </>
  );
}