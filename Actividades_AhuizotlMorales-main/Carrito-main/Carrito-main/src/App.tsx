
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './pages/Home'
import Cart from './pages/Cart'
import About from './pages/About'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/carrito' element={<Cart/>}/>
        <Route path='/nosotros' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App
