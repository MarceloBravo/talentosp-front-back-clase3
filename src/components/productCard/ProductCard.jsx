import styles from './ProductCard.module.css'


export const ProductCard = ({...data}) => {
    const { asin, product_photo, product_title, product_star_rating, product_num_ratings} = data
    const titles = product_title.split('|')


    return (
        <div className={styles.productCard}>
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