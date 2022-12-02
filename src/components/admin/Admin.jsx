import React from 'react'
import AdminMain from './AdminMain'
import styles from './_admin.module.css';
import AdminSidebar from './AdminSidebar';
const Admin = () => {
  return (
    <section id={styles.adminPanel}>
      <article>
        <AdminSidebar />
        <AdminMain />

      </article>
    </section>
  )
}

export default Admin
