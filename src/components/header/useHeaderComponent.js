import { useEffect, useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { useLocation } from 'react-router';

export const useHeaderComponent = () => {
    const { state, getAllProducts, getFavoritosCount } = useProducts();
  const [ searchText, setSearchText ] = useState(localStorage.getItem('filter') || '');
  const [ favoritos, setFavoritos ] = useState(0);
  const location = useLocation();

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

  return {
    searchText,
    handleSearchChange,
    handleKeyDown,
    handleBtnBuscarClick,
    favoritos,
    state,
    location
  }
}