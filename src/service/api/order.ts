import { request } from '../request';

const get_chanel_list = () => {
  return request({
    url: '/channel/list',
    method: 'get'
  });
};

const get_admin_user_list = () => {
  return request({
    url: '/admin_user/list',
    method: 'get'
  });
};
// 查询未支付
const get_unpaid_order_list = (queryArgs: Record<string, any>) => {
  return request<any>({
    url: '/order/unpaid_index',
    method: 'get',
    params: queryArgs
  });
};

// 查询分配订单
const get_assign_order_list = (queryArgs: Record<string, any>) => {
  return request<any>({
    url: '/order/assign_index',
    method: 'get',
    params: queryArgs
  });
};

// 查询驳回订单
const get_rejected_order_list = (queryArgs: Record<string, any>) => {
  return request<any>({
    url: '/order/reject_index',
    method: 'get',
    params: queryArgs
  });
};

// 查询失败订单
const get_failed_order_list = (queryArgs: Record<string, any>) => {
  return request<any>({
    url: '/order/fail_index',
    method: 'get',
    params: queryArgs
  });
};

// 查询完成订单
const get_completed_order_list = (queryArgs: Record<string, any>) => {
  return request<any>({
    url: '/order/complete_index',
    method: 'get',
    params: queryArgs
  });
};

// 导出完成订单
const export_completed_order_list = () => {
  return request<any>({
    url: '/order/complete_index',
    method: 'get',
    params: {
      page: 1,
      page_size: 999999
    }
  });
};

// 查询用户列表
const get_user_list_by_name_or_mobile = (name_or_mobile: string) => {
  return request<any>({
    url: '/admin/user/list',
    method: 'get',
    params: {
      name_or_mobile
    }
  });
};

export {
  get_chanel_list,
  get_admin_user_list,
  get_unpaid_order_list,
  get_assign_order_list,
  get_rejected_order_list,
  get_failed_order_list,
  get_completed_order_list,
  export_completed_order_list,
  get_user_list_by_name_or_mobile
};
