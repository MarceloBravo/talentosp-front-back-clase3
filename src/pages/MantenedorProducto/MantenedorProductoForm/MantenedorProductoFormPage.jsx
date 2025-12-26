import { useState } from 'react'
import styles from './MantenedorProductoFormPage.module.css'
import { useNavigate } from 'react-router'

export const MantenedorProductoFormPage = () => {
    const [ formData, setFormData ] = useState({
        asin: '',
        climate_pledge_friendly: false,
        is_amazon_choice: false,
        is_best_seller: false,
        product_num_ratings: 0,
        product_original_price: 0,
        product_photo: '',
        product_price: 0,
        product_star_rating: 0,
        product_title: '',
        sales_volume: ''
    })
    const [ errorFormData, setErrorFormData ] = useState({
        asin: '',
        product_num_ratings: '',
        product_original_price: '',
        product_photo: '',
        product_price: '',
        product_star_rating: '',
        product_title: '',
        sales_volume: ''
    })
    const navigate = useNavigate()


    const handleInputChange = (e) => {
        setErrorFormData({
            ...errorFormData,
            [e.target.name]: e.target.value.length === 0 ? 'El campo no puede estar vacío' : ''
        })

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked
        })
    }

    const handleInputNumberChange = (e) => {
        setErrorFormData({
            ...errorFormData,
            [e.target.name]: e.target.value.length === 0 ? 'El campo no puede estar vacío' : ''
        })

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleCancelarClick = () => {
        navigate('/')
    }




  return (
    <div>
        <h1>Mantenedor de Productos</h1>
        <div className={styles.formContainer}>
            <div className={styles['form-group-left']}>
                <img src={formData.product_photo} alt={formData.product_title}/>
            </div>
            <div className={styles['form-group-right']}>
                <form>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor='asin'>Código</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="text" 
                                className={styles.formControl} 
                                id='asin' 
                                name="asin" 
                                placeholder='Código del producto'
                                required
                                value={formData.asin}
                                onChange={e => handleInputChange(e)}
                            />
                            {errorFormData.asin && <span className={styles.textDanger}>{errorFormData.asin}</span>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='climate_pledge_friendly'>Amigable con el medio ambiente:</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="checkbox" 
                                className={styles.formCheckInput} 
                                id='climate_pledge_friendly' 
                                name="climate_pledge_friendly" 
                                placeholder='Código del producto'
                                checked={formData.climate_pledge_friendly}
                                onChange={e => handleCheckboxChange(e)}
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='is_amazon_choice'>Seleccionado por amzon</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="checkbox" 
                                className={styles.formCheckInput} 
                                id='is_amazon_choice' 
                                name="is_amazon_choice" 
                                checked={formData.is_amazon_choice}
                                onChange={e => handleCheckboxChange(e)}
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='is_best_seller'>El más vendido</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="checkbox" 
                                className={styles.formCheckInput} 
                                id='is_best_seller' 
                                name="is_best_seller"
                                checked={formData.is_best_seller}
                                onChange={e => handleCheckboxChange(e)}
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='product_num_ratings'>Puntuación del producto</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="text" 
                                className={styles.formControl} 
                                id='product_num_ratings' 
                                name="product_num_ratings" 
                                placeholder='Puntuación del producto'
                                value={formData.product_num_ratings}
                                onChange={e => handleInputNumberChange(e)}
                            />
                            {errorFormData.product_num_ratings && <span className={styles.textDanger}>{errorFormData.product_num_ratings}</span>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='product_original_price'>Precio original</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="text" 
                                className={styles.formControl} 
                                id='product_original_price' 
                                name="product_original_price" 
                                placeholder='Precio original'
                                value={formData.product_original_price}
                                onChange={e => handleInputNumberChange(e)}
                            />
                            {errorFormData.product_original_price && <span className={styles.textDanger}>{errorFormData.product_original_price}</span>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='product_price'>Precio</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="text" 
                                className={styles.formControl} 
                                id='product_price' 
                                name="product_price" 
                                placeholder='Precio del producto'
                                value={formData.product_price}
                                onChange={e => handleInputNumberChange(e)}
                            />
                            {errorFormData.product_price && <span className={styles.textDanger}>{errorFormData.product_price}</span>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='product_star_rating'>Estrellas</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="text" 
                                className={styles.formControl} 
                                id='product_star_rating' 
                                name="product_star_rating" 
                                placeholder='Código del producto'
                                min={0}
                                max={10}
                                value={formData.product_star_rating}
                                onChange={e => handleInputNumberChange(e)}
                            />
                            {errorFormData.product_star_rating && <span className={styles.textDanger}>{errorFormData.product_star_rating}</span>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='product_title'>Descripción del producto</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="text" 
                                className={styles.formControl} 
                                id='product_title' 
                                name="product_title" 
                                placeholder='Descripción del producto'
                                value={formData.product_title}
                                onChange={e => handleInputChange(e)}
                            />
                            {errorFormData.product_title && <span className={styles.textDanger}>{errorFormData.product_title}</span>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='sales_volume'>Volumen de ventas</label>
                        <div className={styles.inputGroup}>
                            <input 
                                type="text" 
                                className={styles.formControl} 
                                id='sales_volume' 
                                name="sales_volume" 
                                placeholder='Volumen en venta'
                                value={formData.sales_volume}
                                onChange={e => handleInputChange(e)}
                            />
                            {errorFormData.sales_volume && <span className={styles.textDanger}>{errorFormData.sales_volume}</span>}
                        </div>
                    </div>
                    
                    <div className={styles.buttonGroup}>
                        <button type='submit' className={'btn ' + styles.btnSuccess}>Guardar</button>
                        <button type='button' className={'btn ' + styles.btnDanger}>Eliminar</button>
                        <button type='button' className={'btn ' + styles.btnPrimary} onClick={handleCancelarClick}>Salir</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
/* Campos eliminados
currency VARCHAR(10) NOT NULL,
delivery VARCHAR(255),
has_variations BOOLEAN DEFAULT FALSE,
is_prime BOOLEAN DEFAULT FALSE,
product_badge VARCHAR(255),
product_minimum_offer_price DECIMAL(10,2),
product_num_offers INT,
*/