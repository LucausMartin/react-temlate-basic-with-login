/**
 * @description 登录注册页面提示字符串常量
 */
export const ErrorMessage = {
  ['default']: `${String.fromCodePoint(0x1f389)} Log in to get started`,
  ['sending']: `${String.fromCodePoint(0x1f4e7)} Sending...`,
  ['register']: `${String.fromCodePoint(0x1f389)} Register to get started`,
  ['failedRegister']: `${String.fromCodePoint(0x1fae5)} Failed to register, please retry`,
  ['code']: `${String.fromCodePoint(0x1fae5)} Verification code error`,
  ['enterCode']: `${String.fromCodePoint(0x1fae5)} Enter the verification code`,
  ['network']: `${String.fromCodePoint(0x1f611)} Network error`,
  ['exist']: `${String.fromCodePoint(0x1fae3)} User does not exist`,
  ['has']: `${String.fromCodePoint(0x1fae3)} User already exists`,
  ['emailEmpty']: `${String.fromCodePoint(0x1fae5)} Email cannot be empty`,
  ['emailFormat']: `${String.fromCodePoint(0x1fae5)} Email format error`,
  ['codeEmpty']: `${String.fromCodePoint(0x1fae5)} Code cannot be empty`,
  ['noCode']: `${String.fromCodePoint(0x1fae5)} No verification code sent or has expired`,
  ['failedToSend']: `${String.fromCodePoint(0x1fae5)} Failed to send`
};

/**
 * @description 错误信息类型枚举
 */
export enum ErrorMessageEnum {
  DEFAULT = 'default',
  SENDING = 'sending',
  REGISTER = 'register',
  FAILED_REGISTER = 'failedRegister',
  CODE = 'code',
  ENTER_CODE = 'enterCode',
  NETWORK = 'network',
  EXIST = 'exist',
  HAS = 'has',
  EMAIL_EMPTY = 'emailEmpty',
  EMAIL_FORMAT = 'emailFormat',
  CODE_EMPTY = 'codeEmpty',
  NO_CODE = 'noCode',
  FAILED_TO_SEND = 'failedToSend'
}

/**
 * @description 发送验证码请求错误类型枚举
 */
export const enum SendCodeErrorTypeEnums {
  NETWORK = 0,
  USER_NOT_FOUND = 1,
  USER_ALREADY_EXISTS = 2,
  FAILED_TO_SEND = 3
}

/**
 * @description 注册请求错误类型枚举
 */
export const enum RegisterErrorTypeEnums {
  NETWORK = 0,
  NO_SENT_CODE = 1,
  CODE_ERROR = 2,
  FAILED_TO_REGISTER = 3,
  USER_ALREADY_EXISTS = 4
}

/**
 * @description 登录请求错误类型枚举
 */
export const enum LoginErrorTypeEnums {
  NETWORK = 0,
  NO_SENT_CODE = 1,
  CODE_ERROR = 2,
  USER_DOES_NOT_EXIST = 3
}

/**
 * @description 登录注册状态枚举
 */
export enum StateEnum {
  LOGIN,
  REGISTER
}
