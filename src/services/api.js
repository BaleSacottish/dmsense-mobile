import Axios from 'axios';

// /**
//  *  ## การใช้ IP ต่อกับ Backend ##
//  *  - เปิด terminal
//  *  - พิมพ์ ipconfig
//  *  - ใช้ ip ตรง IPV4 มาใส่ 'http://{ใส่ตรงนี้}:8080'
//  * 'http://192.168.1.69:8080'
//  * 192.168.1.42
//172.20.10.14
//  * 'https://api.respirasense-th.com/'
//  */

const baseURL = 'https://api.respirasense-th.com/';

const axios = Axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // alert(error);
    return Promise.reject(error);
  },
);

export { axios, baseURL};