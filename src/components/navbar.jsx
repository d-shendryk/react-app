import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { getItems } from '~/api/items';
import { setUser } from '~/stores/slices/users/usersSlice';
import { useIsLoggedIn } from '~/hooks/user';

export function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const login = useGoogleLogin({
    onSuccess: ({ accessToken }) => dispatch(setUser({ accessToken })),
  });

  const logOut = () => {
    googleLogout();
    dispatch(setUser(null));
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography variant="h5" component="div" sx={{ my: 2 }}>
            Food Shop
          </Typography>
          <Box sx={{ py: 2 }}>
            <Button component={Link} color="inherit" to="/">
              Store
            </Button>
            <Button component={Link} color="inherit" to="/order">
              Order
            </Button>
            {isLoggedIn ? (
              <Button component={Link} color="inherit" to="/inventory">
                Inventory
              </Button>
            ) : (
              <> </>
            )}
          </Box>
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
