import './styles/App.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { store } from '@stores';
import { router } from './router';
import theme from './theme';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <RouterProvider router={router} />
          <ToastContainer theme="dark" />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
