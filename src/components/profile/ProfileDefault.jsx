import React, { Fragment,useEffect, useState } from "react";
import styles from "./_profile.module.css";
import { useContext } from "react";
import { AuthContext } from "../../apis/AuthContextApi";
import Spinner from "../../pages/Spinner";
import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import {  doc,onSnapshot } from "firebase/firestore";
import { db } from "../../apis/firebase";

const ProfileDefault = () => {
  let { authUser } = useContext(AuthContext);
   let { uid } = authUser === null ? "" : authUser;
  let [profile, setProfile] = useState(" ");

  let fetchData = async () => {
    onSnapshot(doc(db, "user", uid), doc => {
        setProfile(doc.data());
      });
  };
  useEffect(() => {
    fetchData();
  },[])
  return (
    <div className={styles.mainProfileBlock}>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Profile</h1>
          <article>
            <aside className={styles.asideIcon}>
              <Link to="/profile/upload-profile-photo">
                <figure>
                  <img src={authUser.photoURL || profile.photoURL} alt={profile.displayName||authUser.displayName} />
                </figure>
                <main>
                  <span className={styles.cameraIcon}>
                    <FaCamera />
                  </span>
                </main>
              </Link>
            </aside>
            <footer>
              <h2>{authUser.displayName}</h2>
              <h4>{authUser.email}</h4>
            </footer>
            <aside className={styles.profileUser}>
              <Fragment>
                <p>{profile.gender}</p>
                <p>{profile.city}</p>
                <p>{profile.adress}</p>
              </Fragment>
            </aside>
          </article>
        </Fragment>
      )}
    </div>
  );
};

export default ProfileDefault;
