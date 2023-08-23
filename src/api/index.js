import request from '@/utils/request';


/* 生成订单 */
export function generateOrder(data) {
    return request({
        url: '/gateway/order/post',
        method: 'post',
        data
    })


/* 获取订单信息 */
export function getOrderData(data) {
    return request({
        url: '/gateway/pay/order',
        method: 'post',
        data
    })
}

/* 查询订单状态 */
export function getOrderStatus(data) {
    return request({
        url: '/gateway/query/order/status',
        method: 'get',
        params: data
    })
}
