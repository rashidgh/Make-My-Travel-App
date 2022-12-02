import React, { useState } from "react";
import Styles from "./_auth.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../apis/firebase";
const ResetPassword = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
        setIsLoading(true);
        sendPasswordResetEmail(auth, email);
        toast.info(`password reset link has been sent to ${email} adress please reset new password`);
    } catch (error) {
      toast.error(error.code);
    }
    setEmail("");
    setIsLoading(false);
  };
  let lightMode = e => {
    document.body.style.background = "black";
  };
  return (
    <section id={Styles.authLoginBlock}>
      <article>
        <div className="container">
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              
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
              <aside>
                <span>
                  Already have an account
                </span>
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </aside>
            </div>
            <div className="form-group">
              <button>{isLoading == "true" ? "Loading..." : "Reset password"}</button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default ResetPassword;
