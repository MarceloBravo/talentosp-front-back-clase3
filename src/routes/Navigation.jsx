import { Route, Routes } from 'react-router'
import { HomePage } from '../pages/home/HomePage'
import { DetalleProductoPage } from '../pages/DetalleProducto/DetalleProductoPage'
import { MantenedorProductoListPage } from '../pages/MantenedorProducto/MantenedorProductoList/MantenedorProductoListPage'
import { MantenedorProductoFormPage } from '../pages/MantenedorProducto/MantenedorProductoForm/MantenedorProductoFormPage'

const Navigation = () => {
  return (
        <Routes>
            <Route path="/" Component={HomePage}/>
            <Route path="/product/:id" Component={DetalleProductoPage}/>
            <Route path='/mantenedor' Component={MantenedorProductoListPage}/>
            <Route path='/mantenedor/editar/:id' Component={MantenedorProductoFormPage}/>
            <Route path='/mantenedor/nuevo' Component={MantenedorProductoFormPage}/>
        </Routes>
    )
}

export default Navigation