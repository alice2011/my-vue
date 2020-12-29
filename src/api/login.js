import service from '@/utils/request'
/**
 * 获取验证码
 */
export function GetSms(data){
    service.request({
        url:'/getSms/',
        method:'post',
        data
    })
}


 /**
 * 获取用户角色
 */

 /**
 * 登录
 */

 /**
 * 注册
 */