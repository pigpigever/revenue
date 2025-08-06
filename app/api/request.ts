import axios from 'axios';

const request = axios.create({
  baseURL: 'https://api.finmindtrade.com',
  headers: {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wOC0wNSAxNjo1NzowNSIsInVzZXJfaWQiOiJSZXZlcmIzMDk2IiwiaXAiOiIxOTMuMTc2LjIxMS4xODYifQ._FGke5GtFsAE7Fu22Z1O0HY_TpavFz6yfJn50JU5i0M'
  }
});

export default request;