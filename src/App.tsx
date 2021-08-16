import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import UserAlt from "./pages/UserAlt";

function App() {
  return (
    <main className="page">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/logout" component={Logout} />
          <Route path="/users/:username" component={UserAlt} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
