import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, createContext, useCallback } from "react";

import Cards from "./cards/pages/Cards";
import AddCard from "./cards/pages/AddCard";
import Authenticate from "./users/pages/Authenticate";
import Otp from "./users/pages/Otp";
import Reset from "./users/pages/Reset";
import NavLinks from "./shared/components/navigation/NavLinks";
import { AuthContext } from "./shared/context/auth-context";

const queryClient = new QueryClient();

export const RecoveryContext = createContext();

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setuser(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <RecoveryContext.Provider
        value={{ page, setPage, otp, setOTP, setEmail, email }}
      >
        <QueryClientProvider client={queryClient}>
          <Router>
            <NavLinks></NavLinks>
            <Switch>
              <Route path="/" exact>
                <Cards />
              </Route>
              <Route path="/cards/new" exact>
                <AddCard />
              </Route>
              <Route path="/auth">
                <Authenticate />
              </Route>
              <Route path="/otp">
                <Otp />
              </Route>
              <Route path="/reset">
                <Reset />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Router>
        </QueryClientProvider>
      </RecoveryContext.Provider>
    </AuthContext.Provider>
  );
}
export default App;
