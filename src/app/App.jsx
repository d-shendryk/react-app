import "./App.css";
import { store } from "../stores/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
