import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./_navbar.module.css";
import { AuthContext } from "../../apis/AuthContextApi";

const Menu = () => {
  let { authUser, isLoading, Logout } = useContext(AuthContext);
  let AutheticatedUser = () => {
    return (
      <Fragment>
        <li>
          <div to="/profile" className={Styles.avtarURL}>
            <NavLink to="/profile">
              <img src={authUser.photoURL} alt={authUser.username} />
            </NavLink>
          </div>
        </li>
        <li>
          <button className={Styles.logoutBtn} onClick={() => Logout()}>
            Logout
          </button>
        </li>
      </Fragment>
    );
  };
  let AnynomousUser = () => {
    return (
      <Fragment>
        <li>
          <NavLink to="/register" activeClassName="active">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        </li>
      </Fragment>
    );
  };
  return (
    <div className={Styles.menuBlock}>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        {isLoading === true ? (
          "Loading..."
        ) : authUser === null ? (
          <AnynomousUser />
        ) : (
          <AutheticatedUser />
        )}
      </ul>
    </div>
  );
};

export default Menu;
