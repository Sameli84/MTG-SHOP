import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Cards from "./cards/pages/Cards";
import AddCard from "./cards/pages/AddCard";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Cards />
          </Route>
          <Route path="/cards/new" exact>
            <AddCard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}
export default App;
