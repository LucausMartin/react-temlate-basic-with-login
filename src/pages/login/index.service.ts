import { fetchData, formatResonse } from '@myUtils/fetchData';
import { SERVER_URL, HTTP_STATUS } from '@myConstants/index';
import {
  RegisterParamsType,
  RegisterResType,
  LoginResType,
  LoginParamsType,
  SendVerificationCodeParamsType,
  SendVerificationCodeResType
} from './types';

/**
 * @description 登录网络服务
 */
class LoginService {
  private readonly url = `${SERVER_URL}/users`;
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  /**
   * @description 发送验证码网络请求
   * @param email 邮箱
   * @param login 是否是登录
   * @returns 发送验证码结果
   */
  sendVerificationCode = async (email: string, login: boolean) => {
    try {
      const res = await fetchData<SendVerificationCodeResType, SendVerificationCodeParamsType>(
        'POST',
        {
          url: this.url + '/send-verification-code',
          headers: this.headers
        },
        {
          email,
          login
        }
      );
      return formatResonse(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  };

  /**
   * @description 注册网络请求
   * @param email email
   * @param code 验证码
   * @returns 注册结果
   */
  register = async (email: string, code: string) => {
    try {
      const params: RegisterParamsType = {
        email,
        code
      };
      const res = await fetchData<RegisterResType, RegisterParamsType>(
        'POST',
        {
          url: this.url + '/register',
          headers: this.headers
        },
        params
      );
      return formatResonse<RegisterResType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<RegisterResType>({
        code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  };

  /**
   * @description 登录网络请求
   * @param email 邮箱
   * @param code 验证码
   * @returns 登录结果
   */
  login = async (email: string, code: string) => {
    try {
      const params: LoginParamsType = {
        email,
        code
      };
      const res = await fetchData<LoginResType, LoginParamsType>(
        'POST',
        {
          url: this.url + '/login',
          headers: this.headers
        },
        params
      );
      return formatResonse(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LoginResType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  };
}

export default new LoginService();
