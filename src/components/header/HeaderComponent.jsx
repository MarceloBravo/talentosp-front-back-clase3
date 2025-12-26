import { Link } from 'react-router';
import { useProducts } from '../../contexts/ProductContext';
import { useEffect, useState } from 'react';
import { SpinnerComponent } from '../spinner/SpinnerComponent';
import logo from '../../assets/logo.png';

import styles from './HeaderComponent.module.css';

export const HeaderComponent = () => {
  const { state, getAllProducts, getFavoritosCount } = useProducts();
  const [ searchText, setSearchText ] = useState(localStorage.getItem('filter') || '');
  const [ favoritos, setFavoritos ] = useState(0);

  useEffect(()=> {
    const checkFavoritos = () => {
      const fav = localStorage.getItem('favoritos')
      if(fav){
        const totFav = JSON.parse(fav).length
        setFavoritos(totFav)
      }
    }
    checkFavoritos()
    window.addEventListener('storage', checkFavoritos)
    return () => window.removeEventListener('storage', checkFavoritos)
  },[])

  useEffect(()=> {
    console.log('favoritos', getFavoritosCount())
  },[])
  
  useEffect(()=> {
    setFavoritos(getFavoritosCount() || 0)
  },[getFavoritosCount])

  
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBtnBuscarClick();
    }
  };

  
  const handleBtnBuscarClick = async () => {
    try{
      await getAllProducts(searchText);
    }catch(error){
      console.error('Error loading products:', error);
    }    
  }

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
            </ul>
          </nav>
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
          </div>
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
