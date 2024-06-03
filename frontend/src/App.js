import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Category from './Pages/Category';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import mens_banner from './Components/Assets/banner_mens.png';
import womens_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/mens' element={<Category banner ={mens_banner}category="men"/>}/>
          <Route path='/womens' element={<Category banner={womens_banner} category="women"/>}/>
          <Route path='/kids' element={<Category banner ={kids_banner}category= "kid"/>}/>
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
        <Footer/>

      </BrowserRouter>

    </div>
  );
}

export default App;
