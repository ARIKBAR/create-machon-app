import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaList, FaUserPlus } from 'react-icons/fa';
import { FaFileUpload } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';


import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              <FaList className={styles.icon} />
              <span>רשימת תלמידים</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/Addstudent" className={styles.navLink}>
              <FaUserPlus className={styles.icon} />
              <span>הוספת תלמידים</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/upload" className={styles.navLink}>
              <FaFileUpload className={styles.icon} />
              <span>העלאת קובץ Excel</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/classes/new" className={styles.navLink}>
              <FaChalkboardTeacher className={styles.icon} />
              <span> הוספת כיתות </span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/classes" className={styles.navLink}>
              <FaChalkboardTeacher className={styles.icon} />
              <span> רשימת כיתות </span>
            </Link>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;