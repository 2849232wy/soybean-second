import { request } from '../request';

export function getUnboxCeleList(params: any) {
  return request<any>({
    url: '/unbox_web_celeb',
    method: 'get',
    params
  });
}


