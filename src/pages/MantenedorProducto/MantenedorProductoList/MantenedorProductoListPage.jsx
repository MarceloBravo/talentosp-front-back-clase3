import { SpinnerComponent } from '../../../components/spinner/SpinnerComponent';
import { useMantenedorProductoListPage } from './useMantenedorProductoListPage';

import styles from './MantenedorProductoListPage.module.css';

export const MantenedorProductoListPage = () => {
    const {
        productos,
        imagenes,
        handleBtnNuevo,
        handleBuscarClick,
        handleInputChange,
        handleInputKeyDown,
        handleEditarClick,
        handleEliminarClick,
        searchText, 
        state
    } = useMantenedorProductoListPage();

    if(state.isLoading) return <SpinnerComponent/>

    return (
        <div>
            <h1>Mantenedor de Productos</h1>

            <div className={styles.searchContainer}>
                <button type="button" className={styles.btnSuccess} onClick={handleBtnNuevo}>Nuevo</button>
                <div className={styles.searchControls}>
                    <input 
                        type="text" 
                        className={styles.inputSearch} 
                        placeholder="Buscar producto..." 
                        value={searchText} 
                        onChange={handleInputChange}
                        onKeyDown={e => handleInputKeyDown(e)}
                    />
                    <button className={styles.btnBuscar} onClick={handleBuscarClick}>Buscar</button>
                </div>
            </div>

            <div className={styles.tabla}>
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descripción</th>
                            <th>Foto</th>
                            <th>Precio</th>
                            <th>Precio original</th>
                            <th>Es Amazón</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {productos && productos.map(producto => 
                            <tr key={producto.asin}>
                                <td>{producto.asin}</td>
                                <td className={styles.ellipsisn}>{producto.product_title}</td>
                                <td><img src={imagenes[producto.asin]} alt={producto.titles} style={{width: '60px', height: 'auto', borderRadius: '4px'}} /></td>
                                <td>{producto.product_price}</td>
                                <td>{producto.product_original_price ? 'Sí': 'No'}</td>
                                <td>{producto.product_is_amazon ? 'Sí' : 'No'}</td>
                                <td>
                                    <button type="button" onClick={() => handleEditarClick(producto.asin)}>🖊️</button>
                                    <button type="button" onClick={() => handleEliminarClick(producto.asin)}>✖️</button>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}