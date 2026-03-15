import ProductList from './pages/ProductList'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import CheckOutPage from './pages/CheckOutPage'
import PrivateRouter from './components/PrivateRouter'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
function App() {

  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route element={<PrivateRouter/>}>
          <Route path='/checkout' element={<CheckOutPage/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App
