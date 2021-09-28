import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Tech from "./components/Tech";
import Znaki from "./components/Znaki";
import Edit from "./components/Edit";
import Add from "./components/Add";
import Register from "./components/Register";
import Start from "./components/Start";
import MyAccount from "./components/MyAccount";
import NotFound from "./components/NotFound";
import Groups from './components/Groups';
import Allgroups from './components/AllGroups';
import Admin from './components/Admin';

function App() {
  return (
    <div className="root">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/start" exact component={Start} />
          <Route exact path="/about" component={About} />
          <Route exact path="/technologies" component={Tech} />
          <Route exact path="/signs" component={Znaki} />
          <Route exact path="/edit" component={Edit} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/my_account" component={MyAccount} />
          <Route exact path="/groups" component={Groups} />
          <Route exact path="/allgroups" component={Allgroups} />
          <Route exact path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
