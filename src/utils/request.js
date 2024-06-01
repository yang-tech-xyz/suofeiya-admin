import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
import router from '../router/index'
import fileDownload from 'js-file-download'

// create an axios instance
const service = axios.create({
    timeout: 50000,
    // baseURL:'https://tophisadmin.tophis.net/api/admin'
    baseURL: window.location.origin + '/api/admin'
    // baseURL: window.location.origin+'/tophis-admin'

})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (config.url && (config.url.toLowerCase().indexOf('export') != -1 || config.url.toLowerCase().indexOf('xlsx') != -1)) {
            config['responseType'] = 'blob'
        }
        config.headers['Content-Type'] = `application/json`

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            if (getToken() && getToken() != 'undefined') {
                config.headers['Authorization'] = `${getToken()}`
            }
        }

        // if ((config.method === 'post' || config.method === 'put') && config.params) {
        //   config.data = qs.stringify(config.data)
        // }

        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // // 导出数据
        if (response.config.url.toLowerCase().indexOf('export') != -1 || response.config.url.toLowerCase().indexOf('xlsx') != -1) {
            fileDownload(res, response.headers['content-disposition'] ? response.headers['content-disposition'].split('=')[1] : 'Excel.xlsx')

            return
        }

        // if the custom code is not 20000, it is judged as an error.
        if (response.data.code != 200 && !response.data.access_token && !response.config.notShowError) {
            Message({
                message: res.msg || '请求失败',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;

            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res.data ? res.data : res
        }
    },
    error => {
        if (!error.response.config.notShowError) {
            Message({
                message: error.response.data.msg,
                type: 'error',
                duration: 5 * 1000
            })
        }

        if (error.response.data.msg === '未登录') {
            // to re-login
            store.dispatch('user/resetToken').then(() => {
                router.push(`/login`)
            })
        }
        return Promise.reject(error.response)
    }
)

export default service
