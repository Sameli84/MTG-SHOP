import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, createContext } from "react";

import Cards from "./cards/pages/Cards";
import AddCard from "./cards/pages/AddCard";
import Authenticate from "./users/pages/Authenticate";
import Otp from "./users/pages/Otp";

const queryClient = new QueryClient();

export const RecoveryContext = createContext();

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState(5670);

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
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
            <Redirect to="/" />
          </Switch>
        </Router>
      </QueryClientProvider>
    </RecoveryContext.Provider>
  );
}
export default App;
