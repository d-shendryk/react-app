import { useSelector } from 'react-redux';

export function useIsLoggedIn() {
  const user = useSelector((state) => state.user);
  return Boolean(user);
}
