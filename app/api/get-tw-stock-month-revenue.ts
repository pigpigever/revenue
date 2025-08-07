import request from '@/app/api/request';
import {API_DATASETS} from '@/app/const';

export interface GetTwStockMonthRevenueParams {
  data_id: string;
  start_date: string;
  end_date: string;
}

export type RevenueMonthItem = {
  country: string;
  // YYYY-MM-DD
  date: string;
  // 股票价格
  revenue: number;
  // 每月营收
  revenue_month: number;
  // 年份
  revenue_year: number;
  // 股票 id
  stock_id: string;
}

export interface GetTwStockMonthRevenueResponse {
  msg: string;
  status: number;
  data: RevenueMonthItem[]
}

const getTwStockMonthMonthRevenue = async (params: GetTwStockMonthRevenueParams): Promise<GetTwStockMonthRevenueResponse> => {
  const res = await request.get('/api/v4/data', {params: {dataset: API_DATASETS.TaiwanStockMonthRevenue, ...params}});
  return res.data;
};

export default getTwStockMonthMonthRevenue;