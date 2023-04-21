import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, createContext, useCallback } from "react";

import Cards from "./cards/pages/Cards";
import AddCard from "./cards/pages/AddCard";
import Authenticate from "./users/pages/Authenticate";
import Otp from "./users/pages/Otp";
import Reset from "./users/pages/Reset";
import NavLinks from "./shared/components/navigation/NavLinks";
import { AuthContext } from "./shared/context/auth-context";

const queryClient = new QueryClient();

export const RecoveryContext = createContext();

function App() {
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setuser(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
  }, []);

  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

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
