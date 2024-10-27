import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "./components/ui/button.jsx";
import { Input } from "./components/ui/input";
import { ShoppingCart, Search, Sun, Moon, Home } from "lucide-react";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { useTheme } from "./components/theme-provider";
import AnimatedBackground from "./components/AnimatedBackground";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const { theme, setTheme } = useTheme();

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <div className="relative min-h-screen">
        <AnimatedBackground theme={theme} />
        <div className="container mx-auto p-4 relative z-10">
          <Header />
          <nav className="flex justify-between items-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="text-white text-shadow hover:text-gray-200">
                <Home className="mr-2" size={20} />
                Home
              </Button>
            </Link>
            <div className="flex items-center">
              <div className="relative w-full max-w-sm mr-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white bg-opacity-20 text-white placeholder-gray-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
              </div>
              <Link to="/cart">
                <Button variant="outline" className="mr-4 text-white text-shadow border-white hover:bg-white hover:bg-opacity-20">
                  <ShoppingCart className="mr-2" size={20} />
                  Cart ({cartItems.length})
                </Button>
              </Link>
              <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-white text-shadow hover:text-gray-200">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <ProductList searchTerm={searchTerm} addToCart={addToCart} />
                </>
              } />
              <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
