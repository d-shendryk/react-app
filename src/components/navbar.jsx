import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { getItems } from "../api/items";
import { loadOrder } from "../stores/features/order/orderSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { loadUser, setUser } from "../stores/features/user/userSlice";
import useIsLoggedIn from "../hooks/user";

export default function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => dispatch(setUser({ access_token })),
  });

  const logOut = () => {
    googleLogout();
    dispatch(setUser(null));
  };

  return (
    <AppBar position="static">
      <Toolbar className="flex gap-3">
        <Typography variant="h5" component="div" sx={{ mr: 4 }}>
          Food Shop
        </Typography>
        <Box>
          <Button component={Link} color="inherit" sx={{ my: 2 }} to="/">
            Store
          </Button>
          <Button component={Link} color="inherit" sx={{ my: 2 }} to="/order">
            Order
          </Button>
          {isLoggedIn ? (
            <Button
              component={Link}
              color="inherit"
              sx={{ my: 2 }}
              to="/inventory"
            >
              Inventory
            </Button>
          ) : (
            <></>
          )}
        </Box>
        {isLoggedIn ? (
          <Button onClick={() => logOut()}>Log out</Button>
        ) : (
          <Button onClick={() => login()}>Log in</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
