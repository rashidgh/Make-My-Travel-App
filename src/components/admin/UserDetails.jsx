import React from 'react'
import { useLocation } from 'react-router-dom';
import styles from './_admin.module.css'
const UserDetails = (props) => {
    let location = useLocation();
    let {
        uid,
        displayName,
        firstname,
        lastname,
        email,
        address,
        gender,
        city,
        photoURL,
  } = location.state;
  console.log(firstname,lastname)
  return (
    <section className={styles.userDetails}>
      <img src={photoURL} alt="" />
      <aside>
        <aside className={styles.userDescription}></aside>
      </aside>
      <header>
        <h1>{displayName}</h1>
      </header>
      <main>
        <ul>
          <li>firstname : {firstname}</li>
          <li>lastname : {lastname}</li>
          <li>gender : {gender}</li>
        </ul>
          </main>
          <footer></footer>
    </section>
  );
}

export default UserDetails