import localforage from 'localforage';
import { ready } from '@myStore/slices/login';
import store from '@myStore/index';
import { HTTP_STATUS, SERVER_URL } from '@myConstants/index';

// 网络请求封装，第一个范型是返回的数据类型，第二个范型是请求参数的类型
type Options = {
  url: string;
  headers?: {
    'Content-Type': string;
  };
};

export type SuccessNumber = HTTP_STATUS.OK | HTTP_STATUS.CREATED;
export type FailNumber =
  | HTTP_STATUS.BAD_REQUEST
  | HTTP_STATUS.UNAUTHORIZED
  | HTTP_STATUS.FORBIDDEN
  | HTTP_STATUS.NOT_FOUND
  | HTTP_STATUS.CONFLICT
  | HTTP_STATUS.INTERNAL_SERVER_ERROR;

// 函数重载
async function fetchData<Data>(
  method: 'GET',
  options: Options
): Promise<
  | { code: SuccessNumber; message: string; data: Data }
  | {
      code: FailNumber;
      message: string;
      data: {
        error_type: number;
      };
    }
>;
async function fetchData<Data, Params>(
  method: 'POST',
  options: Options,
  params: Params
): Promise<
  | { code: SuccessNumber; message: string; data: Data }
  | {
      code: FailNumber;
      message: string;
      data: {
        error_type: number;
      };
    }
>;

// 函数实现
async function fetchData<Data, Params>(
  method: 'GET' | 'POST',
  options: Options,
  params?: Params
): Promise<
  | { code: SuccessNumber; message: string; data: Data }
  | {
      code: FailNumber;
      message: string;
      data: {
        error_type: number;
      };
    }
> {
  const { url, headers } = options;
  if (method === 'GET') {
    try {
      const access_token = await localforage.getItem<string>('access_token');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': headers ? headers['Content-Type'] : 'application/json',
          Authorization: access_token ? `Bearer ${access_token}` : ''
        }
      });
      const responseJson = await response.json();
      if (responseJson.code) {
        return responseJson;
      }
      if (!isSuccess(responseJson.statusCode)) {
        console.log(1);
        if (responseJson.statusCode === HTTP_STATUS.UNAUTHORIZED) {
          console.log(2);
          await localforage.removeItem('access_token');
          const refresh_token = await localforage.getItem<string>('refresh_token');
          console.log(3, refresh_token);
          if (!refresh_token) {
            store.dispatch(ready());
            throw new Error('no refresh token');
          }
          try {
            const newAccessToken = await fetch(`${SERVER_URL}/users/refresh-token`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: refresh_token ? `Bearer ${refresh_token}` : ''
              }
            });
            const newAccessTokenJson = await newAccessToken.json();
            console.log(newAccessTokenJson);
            if (newAccessTokenJson.code === HTTP_STATUS.OK) {
              console.log(4);
              await localforage.setItem('access_token', newAccessTokenJson.data.accessToken);
              return fetchData(method, options);
            } else {
              await localforage.removeItem('refresh_token');
              store.dispatch(ready());
              throw new Error(newAccessTokenJson.message);
            }
          } catch {
            throw new Error('refresh token error');
          }
        }
        throw new Error(responseJson.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
  if (method === 'POST') {
    try {
      const access_token = await localforage.getItem<string>('access_token');
      const response = await fetch(url, {
        method: 'POST',
        headers:
          headers === undefined || headers['Content-Type'] === ''
            ? {
                Authorization: access_token ? `Bearer ${access_token}` : 'Bearer '
              }
            : {
                'Content-Type': headers ? headers['Content-Type'] : 'application/json',
                Authorization: access_token ? `Bearer ${access_token}` : 'Bearer '
              },
        body: headers && headers['Content-Type'] === '' ? (params as FormData) : JSON.stringify(params)
      });
      const responseJson = await response.json();
      if (!isSuccess(responseJson.statusCode)) {
        throw new Error(responseJson.message);
      }
      return responseJson;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
  throw new Error('method is not supported');
}

type ResType<ResDataType> =
  | { code: SuccessNumber; message: string; data: ResDataType }
  | {
      code: FailNumber;
      message: string;
      data: {
        error_type: number;
      };
    };

type ResTypeWithSuccess<ResDataType> = {
  success: true;
  data: ResDataType;
  message: string;
};

type ResTypeWithFail = {
  success: false;
  data: { error_type: number };
  message: string;
};

/**
 * @description 格式化返回数据
 * @param res 请求回来的数据
 * @returns 格式化后的数据
 */
function formatResonse<
  ResDataType = {
    error_type: number;
  }
>(res: ResType<ResDataType>): ResTypeWithSuccess<ResDataType> | ResTypeWithFail {
  if (isSuccess(res.code)) {
    return {
      success: true,
      data: res.data as ResDataType,
      message: 'success'
    };
  } else {
    return {
      success: false,
      data: res.data as { error_type: number },
      message: res.message
    };
  }
}

/**
 * @description 判断是否是成功的状态码
 * @param value 状态码
 */
export const isSuccess = (value: number): value is SuccessNumber => {
  return value === HTTP_STATUS.OK || value === HTTP_STATUS.CREATED;
};

export { fetchData, formatResonse };
