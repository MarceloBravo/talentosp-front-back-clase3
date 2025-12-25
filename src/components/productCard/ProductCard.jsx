import { useEffect, useState } from 'react';
import styles from './ProductCard.module.css'

export const ProductCard = ({...data}) => {
    const { asin, product_photo, product_title, product_star_rating, product_num_ratings} = data
    const titles = product_title.split('|')
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(()=> {
        const syncFavorites = () => {
            const favoritos = localStorage.getItem('favoritos');
            if(favoritos){
                const favoritosArray = JSON.parse(favoritos);
                setIsFavorite(favoritosArray.includes(asin));
            }
        }
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
            localStorage.setItem('favoritos', JSON.stringify([asin]));
        } else {
            actualizarFavoritos(favoritos, newStateIsFavorite);
        }

    }
    
    const actualizarFavoritos = (favoritos, isFavorite) => {
        const favoritosArray = JSON.parse(favoritos);
        if (isFavorite) {   //Agregar
            favoritosArray.push(asin);
        } else {    //Eliminar
            const index = favoritosArray.indexOf(asin);
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
                </div>
            </div>
        </div>
    )
}