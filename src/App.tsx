import './App.css'
import { Routes, Route } from 'react-router'
import Products from './pages/Products'
import ProductsDetails from './pages/ProductsDetails'
function App() {

  return (
    <main>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/products/:id' element={<ProductsDetails />} />
      </Routes>
    
    </main>
  )
}

export default App
