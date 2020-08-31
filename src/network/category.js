import {request} from './request'
export function getcategorydata(){
    return request({
        url:"/category"
    })
}

export function getsubcategorydata(maitKey) {
    return request({
      url: '/subcategory',
      params: {
        maitKey
      }
    })
  }
export function getcontentdetaildata(miniWallkey, type){
    return request({
        url:'/subcategory/detail',
        params:{
            miniWallkey,
            type
        }
    })
}