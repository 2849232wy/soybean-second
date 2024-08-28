import { request } from '../request';

export function uploadImg(formData: FormData) {
  return request<any>({
    url: '/upload/image',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}
