import { PopUp, Link, Typewriter } from '@myComponents/index';
import { TextField, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import loginService from './index.service';
import {
  ErrorMessage,
  ErrorMessageEnum,
  StateEnum,
  SendCodeErrorTypeEnums,
  RegisterErrorTypeEnums,
  LoginErrorTypeEnums
} from './constants';
import './index.less';
import localforage from 'localforage';

export const Login: FC<{ closeEvent: () => void; show: boolean }> = ({ closeEvent, show }) => {
  const [sendButText, setSendButText] = useState<'Send' | number>('Send');
  const [sendButDisable, setSendButDisable] = useState(false);
  const [state, setState] = useState<StateEnum.LOGIN | StateEnum.REGISTER>(StateEnum.LOGIN);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [error, setError] = useState<ErrorMessageEnum>(ErrorMessageEnum.DEFAULT);

  /**
   * @description 发送验证码事件
   */
  const sendVerificationCode = async () => {
    if (!email) {
      setError(ErrorMessageEnum.EMAIL_EMPTY);
      setEmailError(true);
      return;
    }
    // 验证邮箱格式
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
      setError(ErrorMessageEnum.EMAIL_FORMAT);
      setEmailError(true);
      return;
    }
    setError(ErrorMessageEnum.SENDING);
    setSendButDisable(true);
    const res = await loginService.sendVerificationCode(email, state === StateEnum.LOGIN);
    if (res.success) {
      setError(ErrorMessageEnum.ENTER_CODE);
      setSendButText(30);
    } else {
      switch (res.data.error_type) {
        case SendCodeErrorTypeEnums.USER_NOT_FOUND:
          setError(ErrorMessageEnum.EXIST);
          break;
        case SendCodeErrorTypeEnums.USER_ALREADY_EXISTS:
          setError(ErrorMessageEnum.HAS);
          break;
        case SendCodeErrorTypeEnums.FAILED_TO_SEND:
          setError(ErrorMessageEnum.FAILED_TO_SEND);
          break;
        default:
          setError(ErrorMessageEnum.NETWORK);
          break;
      }
    }
    setSendButDisable(false);
    setEmailError(false);
  };

  /**
   * @description 切换到注册页面事件
   */
  const switchState = () => {
    if (state === StateEnum.REGISTER) {
      setState(StateEnum.LOGIN);
      setError(ErrorMessageEnum.DEFAULT);
      return;
    }
    setState(StateEnum.REGISTER);
    setError(ErrorMessageEnum.REGISTER);
  };

  /**
   * @description 关闭登录弹窗事件
   */
  const closeLogin = () => {
    closeEvent();
  };

  /**
   * @description 提交表单事件
   */
  const submit = () => {
    if (!email) {
      setError(ErrorMessageEnum.EMAIL_EMPTY);
      setEmailError(true);
      return;
    }
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
      setError(ErrorMessageEnum.EMAIL_FORMAT);
      setEmailError(true);
      return;
    }
    if (!code) {
      setError(ErrorMessageEnum.CODE_EMPTY);
      setCodeError(true);
      return;
    }
    if (state === StateEnum.LOGIN) {
      login();
      return;
    } else {
      register();
    }
  };

  const register = async () => {
    const res = await loginService.register(email, code);
    if (!res.success) {
      switch (res.data.error_type) {
        case RegisterErrorTypeEnums.NO_SENT_CODE:
          setError(ErrorMessageEnum.NO_CODE);
          break;
        case RegisterErrorTypeEnums.CODE_ERROR:
          setError(ErrorMessageEnum.CODE);
          break;
        case RegisterErrorTypeEnums.FAILED_TO_REGISTER:
          setError(ErrorMessageEnum.FAILED_REGISTER);
          break;
        case RegisterErrorTypeEnums.USER_ALREADY_EXISTS:
          setError(ErrorMessageEnum.EXIST);
          break;
        default:
          setError(ErrorMessageEnum.NETWORK);
          break;
      }
    } else {
      await localforage.setItem('access_token', res.data.access_token);
      await localforage.setItem('refresh_token', res.data.refresh_token);
      closeEvent();
    }
  };

  const login = async () => {
    const res = await loginService.login(email, code);
    if (!res.success) {
      switch (res.data.error_type) {
        case LoginErrorTypeEnums.NO_SENT_CODE:
          setError(ErrorMessageEnum.NO_CODE);
          break;
        case LoginErrorTypeEnums.CODE_ERROR:
          setError(ErrorMessageEnum.CODE);
          break;
        case LoginErrorTypeEnums.USER_DOES_NOT_EXIST:
          setError(ErrorMessageEnum.EXIST);
          break;
        default:
          setError(ErrorMessageEnum.NETWORK);
          break;
      }
    } else {
      await localforage.setItem('access_token', res.data.access_token);
      await localforage.setItem('refresh_token', res.data.refresh_token);
      closeEvent();
    }
  };

  // 发送验证码倒计时
  useEffect(() => {
    if (sendButText === 'Send') {
      return;
    }
    if (sendButText === 0) {
      setSendButText('Send');
      return;
    }
    const timer = setTimeout(() => {
      setSendButText(pre => {
        return (pre as number) - 1;
      });
      clearTimeout(timer);
    }, 1000);
  }, [sendButText]);

  // 延时关闭登录弹窗保证动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(StateEnum.LOGIN);
      setSendButDisable(false);
      setState(StateEnum.LOGIN);
      setEmail('');
      setCode('');
      setEmailError(false);
      setCodeError(false);
      setError(ErrorMessageEnum.DEFAULT);
      clearTimeout(timer);
    }, 500);
  }, [show]);

  return (
    <PopUp closeEvent={closeEvent} show={show}>
      <div className="login-container">
        <span className="title">{state === StateEnum.LOGIN ? 'Login' : 'Register'}</span>
        <Typewriter text={ErrorMessage[error]} typingSpeed={50} className="type-writer" />
        <Close className="close" onClick={closeLogin}></Close>
        <TextField
          className="text-field"
          label="Email"
          variant="standard"
          value={email}
          error={emailError}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <div className="text-field">
          <TextField
            className="text-field-verification"
            label="Verification Code"
            variant="standard"
            value={code}
            error={codeError}
            onChange={e => {
              setCode(e.target.value);
            }}
          />
          <Button
            className="send-code"
            variant="outlined"
            disabled={(sendButText !== 'Send' && sendButText !== 0) || sendButDisable}
            onClick={sendVerificationCode}
          >
            {sendButText}
          </Button>
        </div>
        <div className="register" onClick={switchState}>
          <Link text={state === StateEnum.LOGIN ? 'Register' : 'Login'} />
        </div>
        <div className="submit">
          <Button variant="contained" onClick={submit}>
            Let's go
          </Button>
        </div>
      </div>
    </PopUp>
  );
};
