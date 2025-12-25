import { useEffect, useState } from 'react';
import styles from './ProductCard.module.css'

export const ProductCard = ({...data}) => {
    const { asin, product_photo, product_title, product_star_rating, product_num_ratings, product_price} = data
    const titles = product_title.split('|')
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(()=> {
        const syncFavorites = () => {
            const favoritos = localStorage.getItem('favoritos');
            if(favoritos){
                const favoritosArray = JSON.parse(favoritos);
                const exists = favoritosArray.findIndex(p => p.asin === asin) !== -1;
                setIsFavorite(exists);
            }
        }
        syncFavorites();
        window.addEventListener("storage", syncFavorites);
        return () => window.removeEventListener("storage", syncFavorites);
        // eslint-disable-next-line
    }, [])

    
    const toggleFavorite = (e) => {
        e.stopPropagation(); // Prevents the click from bubbling up to the card
        const newStateIsFavorite = !isFavorite;
        setIsFavorite(newStateIsFavorite);

        const favoritos = localStorage.getItem('favoritos');
        if (!favoritos) {
            const item = {asin, product_title, product_star_rating, product_num_ratings, product_price}
            localStorage.setItem('favoritos', JSON.stringify([item]));
        } else {
            actualizarFavoritos(favoritos, newStateIsFavorite);
        }

    }
    
    const actualizarFavoritos = (favoritos, isFavorite) => {
        const favoritosArray = JSON.parse(favoritos);
        if (isFavorite) {   //Agregar
            const item = {asin, product_title, product_star_rating, product_num_ratings, product_price}
            favoritosArray.push(item);
        } else {    //Eliminar
            const index = favoritosArray.findIndex(p => p.asin === asin);
            if (index !== -1) {
                favoritosArray.splice(index, 1);
            }
        }

        localStorage.setItem('favoritos', JSON.stringify(favoritosArray));
    }
    

    return (
        <div className={styles.productCard}>
            <button className={styles.favoriteButton} onClick={toggleFavorite}>
                {isFavorite ? '♥' : '♡'}
            </button>
            <img src={product_photo} alt={asin} />
            <div className={styles.productInfo}>
                <div className={styles.productTitle}>{titles[0]}</div>
                <div className={styles.productTitle}>{titles[1]}</div>
                <div className={styles.productTitle}>{titles[2]}</div>
                <div className={styles.productTitle}>{titles[3]}</div>
                <div className={styles.productTating}>
                    <div className={styles.productStarRating}>{product_star_rating}</div>
                    <div className={styles.productNumRatings}>{product_num_ratings}</div>
                    <div className={styles.productNumRatings}>{product_price}</div>
                </div>
            </div>
        </div>
    )
}