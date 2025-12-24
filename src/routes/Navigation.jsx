import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from '../pages/home/HomePage'

const Navigation = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={HomePage}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation