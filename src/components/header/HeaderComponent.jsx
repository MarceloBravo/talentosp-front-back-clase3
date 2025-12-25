import React from 'react';
import styles from './HeaderComponent.module.css';
import logo from '../../assets/logo.png';

export const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <a href="/">
            <img src={logo} alt="eCommerce Logo" />
            <span>MyStore</span>
          </a>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </nav>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search for products..." />
          <button>Search</button>
        </div>
        <div className={styles.userActions}>
          <a href="/cart" aria-label="Shopping Cart">
            <span className={styles.icon}>🛒</span>
            <span className={styles.cartCount}>0</span>
          </a>
          <a href="/login" aria-label="Login">
            <span className={styles.icon}>👤</span>
          </a>
        </div>
      </div>
    </header>
  );
};
