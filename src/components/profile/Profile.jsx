import React from 'react';
import ProfileMainBlock from './ProfileMainBlock';
import ProfileSidebar from './ProfileSidebar';
import styles from './_profile.module.css'
const Profile = () => {
    return (
      <section id={styles.profileBlock}>
        <article>
          <ProfileSidebar />
          <ProfileMainBlock />
        </article>
      </section>
    );
};

export default Profile
