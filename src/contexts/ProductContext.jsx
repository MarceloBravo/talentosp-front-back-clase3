import { createContext, useReducer, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/useHttp';

// Acción para el reducer
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos en ms

// Estado inicial
const initialState = {
  productsCache: {}, // Cache para listados: { [productId]: { data: product, timestamp } }
  productDetailCache: {}, // Cache para detalles: { [productId]: { data: productDetail, timestamp } }
  loading: false,
  error: null,
};

// Contexto
const ProductContext = createContext();

// Reducer para manejar acciones
function productReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'CACHE_PRODUCT_LIST':
      // Cachea productos del listado (array de productos)
      const updatedProductsCache = { ...state.productsCache };
      action.payload.data.products.forEach(product => {
        updatedProductsCache[product.asin] = {
          data: product,
          timestamp: Date.now(),
        };
      });
      localStorage.setItem('productListCache', JSON.stringify(updatedProductsCache));
      return { ...state, productsCache: { data: { products: updatedProductsCache}}, loading: false };
    case 'CACHE_PRODUCT_DETAIL':
      // Cachea detalle de un producto
      const updatedDetailCache = {
        ...state.productDetailCache,
        [action.payload.asin]: { 
          data: action.payload,
          timestamp: Date.now(),
        },
      };
      localStorage.setItem('productDetailCache', JSON.stringify(updatedDetailCache));
      return { ...state, productDetailCache: updatedDetailCache, loading: false };
    case 'CLEAR_EXPIRED_CACHE':
      // Limpia entradas expiradas en ambos caches
      const now = Date.now();
      const filteredProductsCache = Object.fromEntries(
        Object.entries(state.productsCache).filter(
          ([, { timestamp }]) => now - timestamp < CACHE_TTL
        )
      );
      const filteredDetailCache = Object.fromEntries(
        Object.entries(state.productDetailCache).filter(
          ([, { timestamp }]) => now - timestamp < CACHE_TTL
        )
      );
      localStorage.setItem('productListCache', JSON.stringify(filteredProductsCache));
      localStorage.setItem('productDetailCache', JSON.stringify(filteredDetailCache));
      return { ...state, productsCache: filteredProductsCache, productDetailCache: filteredDetailCache };
    case 'LOAD_CACHE_FROM_STORAGE':
      // Carga desde localStorage al inicializar
      const storedListCache = JSON.parse(localStorage.getItem('productListCache') || '{}');
      const storedDetailCache = JSON.parse(localStorage.getItem('productDetailCache') || '{}');
      return { ...state, productsCache: storedListCache, productDetailCache: storedDetailCache };
    default:
      return state;
  }
}

// Provider
export function ProductProvider({ children }) {
  const [ state, dispatch ] = useReducer(productReducer, initialState);
  const { sendRequest } = useHttp();

  // Carga cache desde localStorage al montar
  useEffect(() => {
    dispatch({ type: 'LOAD_CACHE_FROM_STORAGE' });
  }, []);

  // Función para obtener un producto (detalle, con cache)
  const getProduct = async (productId) => {
    dispatch({ type: 'CLEAR_EXPIRED_CACHE' }); // Limpia expirados primero

    const cached = state.productDetailCache[productId];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data; // Usa cache si no expiró
    }

    // Si no está en cache o expiró, fetch desde API
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await sendRequest(`product.js`, 'GET');
      const product = response;
      dispatch({ type: 'CACHE_PRODUCT_DETAIL', payload: product });
      return product;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // Función para obtener todos los productos (listado, con cache)
  const getAllProducts = async () => {
    dispatch({ type: 'CLEAR_EXPIRED_CACHE' }); // Limpia expirados primero

    // Verifica si hay productos en cache (al menos algunos)
    const cachedProducts = Object.values(state.productsCache);
    if (cachedProducts.length > 0 && cachedProducts.every(p => Date.now() - p.timestamp < CACHE_TTL)) {
      return cachedProducts.map(p => p.data); // Retorna lista desde cache
    }

    // Si no hay cache válido, fetch desde API
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await sendRequest('products_list.js', 'GET');
      const products = response; // Asumiendo que data es array de productos
      dispatch({ type: 'CACHE_PRODUCT_LIST', payload: products });
      return products;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // Función para limpiar cache manualmente (opcional)
  const clearCache = () => {
    localStorage.removeItem('productListCache');
    localStorage.removeItem('productDetailCache');
    dispatch({ type: 'CLEAR_EXPIRED_CACHE' });
  };

  return (
    <ProductContext.Provider value={{ state, getProduct, getAllProducts, clearCache }}>
      {children}
    </ProductContext.Provider>
  );
}

// Hook para usar el contexto
export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de un ProductProvider');
  }
  return context;
}
