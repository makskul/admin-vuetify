import axios from 'axios'

const axiosIns = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    headers: {
        'Access-Control-Allow-Credentials':true,
    },
    params: {
        // tubeUrl: 'sexwat.ch'
    }
  // You can add your headers here
  // ================================
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export default axiosIns
