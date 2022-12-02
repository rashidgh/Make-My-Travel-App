import React, { useState } from "react";
import Styles from "./_auth.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../../apis/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { BsTelephoneFill } from "react-icons/bs";
const PhoneAuth = () => {
  let navigate = useNavigate();
    let [phone, setPhone] = useState("");
    let [otp,setOtp] = useState("")
  let [isLoading, setIsLoading] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let reCapthaVerifier = new RecaptchaVerifier(
        "captcha-container",
        {
          size: "invisible",
          callback: response => {
            console.log(response);
            console.log(response);
          },
        },
        auth
      );
      let sendOtp = signInWithPhoneNumber(auth, phone, reCapthaVerifier);
      let confirmationMessage = window.prompt("enter OTP");
      (await sendOtp).confirm(confirmationMessage);
      navigate("/");
    } catch (error) {
      toast.error(error.code);
    }
    setIsLoading(false);
  };
  return (
    <section id={Styles.authLoginBlock}>
      <article>
        <div className="container">
          <h1>Login with phone number</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <span className={Styles.phoneIcon}>
                <BsTelephoneFill />
              </span>

              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                placeholder="enter valid phonenumber"
                required
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div id="captcha-container"></div>
            <div className="form-group">
              <aside>
                <span>Already have an account</span>
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </aside>
            </div>
            <div className="form-group">
              <button>{isLoading == "true" ? "Loading..." : "send otp"}</button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default PhoneAuth;
