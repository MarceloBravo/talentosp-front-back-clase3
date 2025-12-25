import { Route, Routes } from 'react-router'
import { HomePage } from '../pages/home/HomePage'
import { DetalleProductoPage } from '../pages/DetalleProducto/DetalleProductoPage'

const Navigation = () => {
  return (
        <Routes>
            <Route path="/" Component={HomePage}/>
            <Route path="/product/:id" Component={DetalleProductoPage}/>
        </Routes>
    )
}

export default Navigation