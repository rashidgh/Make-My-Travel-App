import React, { useState } from "react";
import styles from "./_admin.module.css";
import { db } from "../../apis/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { Link } from "react-router-dom";
const ListOfUsers = () => {
  let [users, setUsers] = useState([]);
  console.log(users);
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
    <div className={styles.card}>
      <h2>Users</h2>
      <p>
        <strong>Users</strong>
        <span>{users.length > 0 && users.length}</span>
      </p>

      <p>
        <Moment format="DD/MM/YY">{new Date()}</Moment>
      </p>
      <p>
        <Link to="/admin/users">
          <button>view users</button>
        </Link>
      </p>
    </div>
  );
};

export default ListOfUsers;
