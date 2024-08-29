export interface RegisterResType {
  access_token: string;
  refresh_token: string;
}

export interface LoginResType {
  access_token: string;
  refresh_token: string;
}

export interface SendVerificationCodeResType {
  success: true;
}

export interface RegisterParamsType {
  email: string;
  code: string;
}

export interface LoginParamsType {
  email: string;
  code: string;
}

export interface SendVerificationCodeParamsType {
  email: string;
  login: boolean;
}
