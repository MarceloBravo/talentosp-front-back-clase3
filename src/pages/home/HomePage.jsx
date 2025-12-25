import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { SpinnerComponent } from '../../components/spinner/SpinnerComponent';
import { ProductCard } from '../../components/productCard/ProductCard';
import { useProducts } from '../../contexts/ProductContext';

import styles from './HomePage.module.css'

export const HomePage = () => {
    const { state, getAllProducts} = useProducts();
    const [ products, setProducts ] = useState([])
    const location = useLocation();

    useEffect(() => {
        const getAll = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data?.data?.products || []);
            } catch (error) {
                console.error('Error loading products:', error);
            }
        }
        
        getAll();
        // eslint-disable-next-line
    }, [location.pathname]);

    if (state.loading) return <SpinnerComponent />;
    if (state.error) return <p>Error: {state.error}</p>;

    return (
        <>
            <h2>Las mejores ofertas en smartphones</h2>
            <div className={styles.productsGrid}>
            {products.length > 0 && products.map(product => 
                <ProductCard key={product.asin} {...product}/>
            )}
            </div>
        </>
    )
}