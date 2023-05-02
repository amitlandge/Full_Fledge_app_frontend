import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import MainNavigation from "./UI/Components/MainNavigation";
import Users from "./User/Pages/Users";
import Places from "./Places/Pages/Places";
import AddNewPlace from "./Places/Pages/AddNewPlace";
import UpdatePlace from "./Places/Components/UpdatePlace";
import Auth from "./User/Pages/Auth";
import AuthContext from "./Context/auth-context";
import React, { useCallback, useEffect, useState } from "react";

function App() {
  const [tokken, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const login = useCallback((id, token) => {
    setToken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, token: token })
    );
    setUserId(id);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.userId) {
      login(data.userId, data.token);
    }
  }, [login]);
  let routes;
  if (tokken) {
    routes = (
      <Switch>
        <Route path="/new/places" exact>
          <AddNewPlace />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/users/places/:placeId" exact>
          <Places />
        </Route>
        <Route path="/place/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/new/places" />
      </Switch>
    );
  }
  if (!tokken) {
    routes = (
      <Switch>
        <Route path="/home" exact>
          <p>Home Route</p>
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/users/places/:placeId" exact>
          <Places />
        </Route>
        <Route path="/users/:userId" exact>
          <Users />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggenedIn: !!tokken,
          token: tokken,
          login: login,
          logout: logout,
          userId: userId,
        }}
      >
        <nav>
          <MainNavigation />
        </nav>
        <main>{routes}</main>
        <footer></footer>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
