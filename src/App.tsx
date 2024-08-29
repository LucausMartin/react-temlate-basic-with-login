import { Outlet } from 'react-router-dom';
import { increment, decrement, selectCount } from '@myStore/slices/count';
import { logout, ready, selectLogin } from '@myStore/slices/login';
import { fetchData } from '@myUtils/fetchData';
import { useAppDispatch, useAppSelector } from '@myStore/hooks';
import { Login } from '@myPages/login';
import { LOGIN_STATE_ENUM } from '@myConstants/index';
import localforage from 'localforage';
import './App.less';
import { useEffect } from 'react';

function App() {
  const count = useAppSelector(selectCount);
  const loginState = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  const test = async () => {
    try {
      await localforage.setItem(
        'refresh_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im16eDI2MDI2ODU0MTFAZ21haWwuY29tIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3MjQ4MzExMDYsImV4cCI6MTcyNTQzNTkwNn0.lFrZnM9A-4QhGXaJcrXZhrFi_AWnboklN7xhb6yA2dg'
      );
      const res = await fetchData<{ a: string }>('GET', {
        url: 'http://localhost:3000/v1/users/test'
      });
      console.log(res);
    } catch (error) {
      console.log(123, error);
    }
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <div>
      <h1>APP</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button
        onClick={() => {
          dispatch(ready());
        }}
      >
        login
      </button>
      <Outlet></Outlet>
      <Login
        show={loginState === LOGIN_STATE_ENUM.READY}
        closeEvent={() => {
          dispatch(logout());
        }}
      ></Login>
    </div>
  );
}

export default App;
