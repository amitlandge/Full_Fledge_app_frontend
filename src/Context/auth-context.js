import { createContext } from "react";

const AuthContext = createContext({
  isLoggenedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
export default AuthContext;
