import { useSelector } from "react-redux";

export default function useIsLoggedIn() {
  const user = useSelector((state) => state.user);
  return Boolean(user);
}
