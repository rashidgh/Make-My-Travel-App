import React from 'react'
import styles from './_admin.module.css';
import { Outlet } from 'react-router-dom';

const AdminMain = () => {
  return (
      <aside className={styles.adminMain}>
          <aside className={styles.users}>
              <Outlet />
          </aside>
    </aside>
  )
}

export default AdminMain