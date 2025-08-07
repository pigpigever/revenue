import request from '@/app/api/request';
import {API_DATASETS} from '@/app/const';

export interface GetTwStockInfoParams {
  data_id?: string;
}

export type StockInfo = {
  date: string;
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
}

export interface GetTwStockInfoResponse {
  msg: string;
  data: StockInfo[];
}

const getTwStockInfo = async (params?: GetTwStockInfoParams): Promise<GetTwStockInfoResponse> => {
  const res = await request.get('/api/v4/data', {params: {dataset: API_DATASETS.TaiwanStockInfo, ...params}});
  return res.data;
};

export default getTwStockInfo;