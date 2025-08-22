import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import HomePage from "./components/pages/Home/HomePage";
import ShopPage from "./components/pages/shop/ShopPage";
import DetailsPage from "./components/pages/DetailsPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import CartPage from "./components/pages/CartPage";
import ContactPage from "./components/pages/ContactPage";
import Header from "./components/headerfiles/Header";
import Footer from "./components/FooterFiles/Footer";
import BackToTop from "./components/BackToTop";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/details/:id" element={<DetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
            <BackToTop />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
