import React from 'react'
import { Link } from 'react-router-dom'
import styles from './_admin.module.css';

const User =(props)=> {
    
    let { uid,
        displayName,
        firstname,
        lastname,
        email,
        address,
        gender,
        city,
        photoURL, } = props;
    console.log(props)
  return (
      <div>
          <figure>
              <img src={ photoURL} alt={displayName} />
          </figure>
          <main>
              <h2>{ displayName}</h2>
              <p>{ gender}</p>
              <p>{address}</p>
              <p className={styles.address}>{ address}</p>
              <p>
                  <Link to={{ pathname:`/admin/${uid}`}} state={props}>view user</Link>
              </p>
          </main>
    </div>
  )
}

export default User;