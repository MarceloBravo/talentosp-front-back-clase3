import styles from './HeaderComponent.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

export const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link to="/">
            
            <img src={logo} alt="eCommerce Logo" />
            <span>MyStore</span>
          </Link>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li><Link to="/">Home</Link></li>
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
