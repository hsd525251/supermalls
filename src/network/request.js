import axios from 'axios'
export function request(config){
    //使用自定义配置创建axios实例，可在其他页面使用
    const instance = axios.create({
        //urlbase:'http://123.207.32.32:8000'
        baseURL:'http://152.136.185.210:8000/api/z8',
        timeout:5000
   })

//axiso拦截器
//请求拦截
instance.interceptors.request.use(config=>{
    return config
}),err=>{

}
//响应拦截
instance.interceptors.response.use(res=>{
    return res.data
}),err=>{

}
//返回的是promise，在其他地方可以直接.then,发送真正的网络请求
return instance(config)

}