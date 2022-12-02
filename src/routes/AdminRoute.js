import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../apis/AuthContextApi";
import {db} from "../apis/firebase"
import { getDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AdminRoute = ({ children }) => {
    let [role, setRole] = useState(null);
    let { isLoading, authUser } = useContext(AuthContext);
    let { uid } = authUser === null ? "" : authUser;
    if (
      (isLoading === true && authUser.accessToken) ||
      window.sessionStorage.getItem("token")
    ) {
      let fetchData = async () => {
        let adminRef = doc(db, "users", uid);
        let adminUser = await getDoc(adminRef);
        console.log(adminUser.data());
        setRole(role);
      };
      fetchData();
      if (role !== undefined || (role !== null && role === "admin")) {
        return <>{children}</>;
      } else {
        toast.warn("you are not authorized");
        return <Navigate to="/profile" />;
      }
    } else {
      return <Navigate to="/login" />;
    }
}

export default AdminRoute;
