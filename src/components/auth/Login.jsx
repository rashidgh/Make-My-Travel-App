import React, { useState } from 'react'
import Styles from './_auth.module.css';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsQuestionLg } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../apis/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri"

const Login = () => {
  let navigate = useNavigate()
  let [showPassword, setShowPassword] = useState(false);
  let [toggle, setToggle] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [isLoading, setIsLoading] = useState(false);

    let togglePassword = () => {
      setToggle(!toggle);
      setShowPassword(!showPassword);
    };
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let userData = await signInWithEmailAndPassword(auth, email, password);
      
      if (userData.user.emailVerified ===true) {
        
        toast.success(`sucessfully ${email} logged in`);
        navigate("/");
      } else {
        toast.error("Email not yet verified");
      }
    } catch (error) {
      toast.error(error.code);
    }
    setEmail("");
    setPassword("");
    setIsLoading(false);
  }

  return (
    <section id={Styles.authLoginBlock}>
      <article>
        <div className="container">
          <h1>Login</h1>
          <Link to="/phone-auth" className={Styles.phoneAuth}>
            Login with phone number
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <span className={Styles.user}>
                <FaUserAlt />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="enter an email"
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Password</label>
              <span className={Styles.pwd}>
                <RiLockPasswordFill />
              </span>
              <input
                type={showPassword === true ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                placeholder="enter a password"
                required
                onChange={e => setPassword(e.target.value)}
              />
              <span className={Styles.eyeIcon} onClick={togglePassword}>
                {showPassword === true ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
            <div className="form-group">
              <aside>
                <span>
                  Don't have an account <BsQuestionLg />{" "}
                </span>
                <span>
                  <Link to="/register">Register</Link>
                </span>
              </aside>
              <p>
                <Link to="/reset-password">Reset password</Link>
              </p>
            </div>
            <div className="form-group">
              <button>{isLoading == "true" ? "Loading..." : "Login"}</button>
            </div>
          </form>
        </div>
      </article>
      {/* <button onClick={lightMode}>😎</button> */}
    </section>
  );
}

export default Login;
