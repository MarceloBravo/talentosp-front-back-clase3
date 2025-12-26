import { useEffect, useState } from 'react';
import { useProducts } from '../../../contexts/ProductContext';
import { SpinnerComponent } from '../../../components/spinner/SpinnerComponent';
import { useNavigate } from 'react-router';

import styles from './MantenedorProductoListPage.module.css';
import { useHttp } from '../../../hooks/useHttp';

export const MantenedorProductoListPage = () => {
    const { isLoading, error, data, sendRequest } = useHttp();
    const { state, getAllProducts} = useProducts();
    const [ productos, setProductos ] = useState([]);
    const navigate = useNavigate();


    useEffect(()=> {
        const obtenerProductos = async () => {
            try {
                const response = await getAllProducts();
                console.log(response.data);
                setProductos(response?.data || []);
            } catch (error) {
                console.error('Error loading products:', error);
            }
        }

        obtenerProductos();
    },[])

    const handleBtnNuevo = () => {
        navigate('/mantenedor/nuevo');
    }

    const handleBuscarClick = (e) => {

    }

    const handleEditarClick = (id) => {
        navigate(`/mantenedor/editar/${id}`);
    }

    const handleEliminarClick = async (id) => {
        if(window.confirm("¿Estás seguro de eliminar este producto?")){
            try{
                await sendRequest(`/products/${id}`, 'DELETE', null)
                alert('Producto eliminado exitosamente')
            }catch(err){
                alert(err.message)
            }
        }
    }


    if(state.isLoading) return <SpinnerComponent/>

    return (
        <div>
            <h1>Mantenedor de Productos</h1>

            <div className={styles.searchContainer}>
                <button type="button" className={styles.btnSuccess} onClick={handleBtnNuevo}>Nuevo</button>
                <div className={styles.searchControls}>
                    <input type="text" className={styles.inputSearch} placeholder="Buscar producto..."/>
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
                                <td><img src={producto.product_photo} alt={producto.titles} style={{width: '60px', height: 'auto', borderRadius: '4px'}} /></td>
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