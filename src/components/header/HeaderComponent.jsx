import { Link } from 'react-router';
import { SpinnerComponent } from '../spinner/SpinnerComponent';
import { useHeaderComponent } from './useHeaderComponent';

import logo from '../../assets/logo.png';
import styles from './HeaderComponent.module.css';

export const HeaderComponent = () => {
  const {
    searchText,
    handleSearchChange,
    handleKeyDown,
    handleBtnBuscarClick,
    favoritos,
    state,
    location
  } = useHeaderComponent();

  return (
    <>
      {state.loading && <SpinnerComponent />}
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
              <li><Link to="/mantenedor">Mantenedor de Productos</Link></li>
            </ul>
          </nav>
          {location.pathname === '/' && (
            <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Buscar producto..." 
              value={searchText} 
              onChange={handleSearchChange} 
              onKeyDown={handleKeyDown}
              aria-label="Search"
            />
            <button type="button" onClick={e => handleBtnBuscarClick(e)}>Buscar</button>
          </div>)}
          <div className={styles.userActions}>
            <a href="/cart" aria-label="Shopping Cart">
              <span className={styles.icon}>❤️</span>
              <span className={styles.cartCount}>{favoritos}</span>
            </a>
            <a href="/login" aria-label="Login">
              <span className={styles.icon}>👤</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
