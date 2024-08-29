export interface RegisterResType {
  auth: string;
}

export interface LoginResType {
  auth: string;
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
