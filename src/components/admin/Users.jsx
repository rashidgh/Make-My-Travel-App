import React, { Fragment, useState } from "react";
import styles from "./_admin.module.css";
import { db } from "../../apis/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "./../../pages/Spinner";
import User from "./User";

const Users = () => {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    try {
      let fetchUsers = async () => {
        let usersCollectionRef = collection(db, "user");
        let userData = await getDocs(usersCollectionRef);
        let payload = userData.docs.map(user => {
          return { ...user.data(), id: user.id };
        });
        let flteredUser = payload.filter(user => user.role !== "admin");
        setUsers(flteredUser);
      };
      fetchUsers();
    } catch (error) {
      toast.error(error.code);
    }
  }, []);

  return (
    <Fragment>
      <h2>users</h2>
      <div className={styles.cardBody}>
        {users.map.length === 0 ? (
          <Spinner />
        ) : (
          users?.map(user => {
            return <User key={user.id} {...user} />;
          })
        )}
      </div>
      
    </Fragment>
  );
};
export default Users;
