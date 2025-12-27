import { useMantenedorProductoFormPage } from './useMantenedorProductoFormPage'

import styles from './MantenedorProductoFormPage.module.css'

export const MantenedorProductoFormPage = () => {    
    const {
        id,
        formData,
        errorFormData,
        handleInputChange,
        handleCheckboxChange,
        handleInputNumberChange,
        handleCancelarClick,
        handleGrabarClick,
        handleCargarImagenClick,
        handleFileChange,
        handlerEliminarClick,
        imgDefault,
        inputRef
    } = useMantenedorProductoFormPage();

  return (
    <div>
        <h1>Mantenedor de Productos</h1>
        <div>{id}</div>
        <div className={styles.formContainer}>
            <div className={styles['form-group-left']}>
                <img src={formData.product_photo ?? imgDefault} alt={formData.product_title}/>
            <button className={styles.btnSuccess} onClick={handleCargarImagenClick}>Cargar imágen</button>
            <input type="file" ref={inputRef} accept="image/png" style={{display: 'none'}} onChange={handleFileChange} />
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
                                disabled={id}
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
                        <label htmlFor='currency'>Tipo Moneda</label>
                        <div className={styles.inputGroup}>
                            <select 
                                className={styles.formControl} 
                                id='currency' 
                                name="currency" 
                                value={formData.currency}
                                onChange={e => handleInputNumberChange(e)}
                            >
                                <option value='' disabled>Seleccione</option>
                                <option value='CLP'>Peso Chileno</option>
                                <option value='USD'>Dólar Estadounidense</option>
                                <option value='EUR'>Euro</option>
                                <option value='GBP'>Libra Esterlina</option>
                                <option value='JPY'>Yen Japonés</option>
                                <option value='AUD'>Dólar Australiano</option>
                            </select>
                            {errorFormData.product_star_rating && <span className={styles.textDanger}>{errorFormData.product_star_rating}</span>}
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
                        <button type='button' className={'btn ' + styles.btnSuccess} onClick={handleGrabarClick}>Guardar</button>
                        <button type='button' className={`btn ${styles.btnDanger} ${!id ? styles.disabled : ''}`} disabled={!id} onClick={handlerEliminarClick}>Eliminar</button>
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