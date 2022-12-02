import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./_profile.module.css";
const ProfileSidebar = () => {
    return (
      <div className={styles.sidebarProfile}>
        <nav>
          <ul>
            <li>
              <NavLink to="/profile" activeClassName="active">
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile/upload-profile-photo" activeClass="active">
                Update profile photo
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile/add-profile">Add profile</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
};

export default ProfileSidebar;
