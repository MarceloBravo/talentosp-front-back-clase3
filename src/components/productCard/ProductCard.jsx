import React from 'react';
import { useProductCard } from './useProductCard';

import styles from './ProductCard.module.css'

export const ProductCard = React.memo((data) => {
    const {
        asin,
        titles,
        product_photo, 
        product_star_rating, 
        product_num_ratings, 
        product_price,
        isFavorite,
        toggleFavorite,
        handleProdictoClick
    } = useProductCard(data);

    

    return (
        <div className={styles.productCard}>
            <button className={styles.favoriteButton} onClick={toggleFavorite}>
                {isFavorite ? '♥' : '♡'}
            </button>
            <img src={product_photo} alt={asin} onClick={handleProdictoClick}/>
            <div className={styles.productInfo}>
                <div className={styles.productTitle}>{titles[0]}</div>
                <div className={styles.productTitle}>{titles[1]}</div>
                <div className={styles.productTitle}>{titles[2]}</div>
                <div className={styles.productTitle}>{titles[3]}</div>
                <div className={styles.productTating}>
                    <div className={styles.productStarRating}>{product_star_rating}</div>
                    <div className={styles.productNumRatings}>Rating {product_num_ratings}</div>
                    <div className={styles.productNumRatings}>$ {product_price}</div>
                </div>
            </div>
        </div>
    )
})