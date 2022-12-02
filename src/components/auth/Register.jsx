import React, { useState } from "react";
import Styles from "./_auth.module.css";
import Auth_Image from "./auth_image.jpg";
import { toast } from "react-toastify";
import { auth } from "../../apis/firebase";
import md5 from "md5";

import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    isLoading: false,
  });
  let { username, email, password, confirmpassword, isLoading } = state;
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      if (password !== confirmpassword) {
        toast.error("password is not matched");
      } else {
        setState({ isLoading: true });
        let userData = await createUserWithEmailAndPassword(
          auth, email, password
        );
        sendEmailVerification(userData.user);
        let message = `Email verification mail has been sent to ${email} adress please verify...`;
        updateProfile(userData.user,
          {
            displayName: username,
            photoURL: `https://www.gravatar.com/avatar/${md5(email)}?q=identicon`,
          });
        toast.success(message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
    // !resetting form
    setState({
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      isLoading: false,
    });
  };
  return (
    <section id={Styles.authBlock}>
      <article>
        <div className={Styles.authLeft}>
          <h1>Register</h1>
          <figure>
            <img src={Auth_Image} alt="auth_image" />
          </figure>
        </div>
        <div className={Styles.authRight}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">username:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="enter username"
                value={username}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="enter email"
                value={email}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="enter password"
                value={password}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">confirm password:</label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="re enter password"
                value={confirmpassword}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button>{isLoading === true ? "Loading..." : "Register"}</button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Register;
