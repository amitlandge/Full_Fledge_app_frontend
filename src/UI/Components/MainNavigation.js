import React, { useContext } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./MainNavigation.css";
import AuthContext from "../../Context/auth-context";
function MainNavigation() {
  const ctx = useContext(AuthContext);
  const logoutHandler = () => {
    ctx.logout();
  };
  return (
    <div className="container">
      <h1>YourPlaces</h1>
      <ul className="list">
        <li>
          <NavLink to="/users">All Users</NavLink>
        </li>

        {ctx.isLoggenedIn && (
          <>
            <li>
              <NavLink to={`/users/places/${ctx.userId}`}>My Places</NavLink>
            </li>
            <li>
              <NavLink to="/new/places">Add Place</NavLink>
            </li>
            <li>
              <NavLink to="/auth" onClick={logoutHandler}>
                Logout
              </NavLink>
            </li>
          </>
        )}
        {!ctx.isLoggenedIn && (
          <li>
            <NavLink to="/auth">Authentication</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default MainNavigation;
