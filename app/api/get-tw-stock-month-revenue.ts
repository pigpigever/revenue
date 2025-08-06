import request from '@/app/api/request';
import {API_DATASETS} from '@/app/const';

export interface GetTwStockMonthRevenueParams {
  data_id: string;
  start_date: string;
  end_date: string;
}

const getTwStockMonthMonthRevenue = (params: GetTwStockMonthRevenueParams) => {
  return request.get('/api/v4/data', {params: {dataset: API_DATASETS.TaiwanStockMonthRevenue, ...params}}).then(res => res.data);
};

export default getTwStockMonthMonthRevenue;