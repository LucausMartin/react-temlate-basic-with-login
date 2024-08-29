import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './router.tsx';
import store from './store/index.ts';
import { Provider } from 'react-redux';
import './index.less';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
