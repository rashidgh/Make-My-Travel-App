import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import styles from "./_profile.module.css";
import { db, auth } from "../../apis/firebase";
import { doc, setDoc } from "@firebase/firestore";
import { AuthContext } from "../../apis/AuthContextApi";
const AddProfileData = () => {
  let { authUser } = useContext(AuthContext);
  let { uid } = authUser === null ? "" : authUser;
  let [state, setState] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    city: "",
    adress: "",
    isLoading: false,
  });
  let { firstname, lastname, gender, city, adress, isLoading } = state;
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async e => {
    e.preventDefault();

    try {
      let payload = {
        firstname,
        lastname,
        gender,
        city,
        adress,
      };
      //   collection path (database location)

      let { displayName, photoURL, email } = authUser;
      let userCollectionRef = doc(db, "user", uid);
      await setDoc(userCollectionRef, {
        uid,
        displayName,
        photoURL,
        email,
        ...payload,
      });
      toast.success("user information is updated");
      window.location.assign("/profile");
    } catch (error) {
      toast.error(error.code);
    }
  };
  return (
    <div className={styles.mainProfileBlock}>
      <h1>Add Profile</h1>
      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">firstname</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={firstname}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">lastname</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastname}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group" value={gender} onChange={handleChange}>
          <label htmlFor="firstname">gender</label>
          <span>
            <input
              type="radio"
              name="gender"
              id="gender"
              value="male"
              required
            />
            Male
          </span>
          <span>
            <input
              type="radio"
              name="gender"
              id="gender"
              value="female"
              required
              onChange={handleChange}
            />
            Female
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="city">city</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group" id={styles.textArea}>
          <label htmlFor="adress">Adress</label>
          <textarea
            name="adress"
            id="address"
            cols="30"
            rows="10"
            value={adress}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <button>{isLoading === true ? "loading ..." : "submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddProfileData;
