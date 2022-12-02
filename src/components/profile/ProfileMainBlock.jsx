import React from 'react'
import styles from "./_profile.module.css";
import { Outlet } from 'react-router-dom';
const ProfileMainBlock = () => {
    return (
        <div className={styles.mainProfileBlock}>
            <Outlet />
        </div>
    )
}

export default ProfileMainBlock
