import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "./components/ui/button.jsx";
import { Input } from "./components/ui/input";
import { ShoppingCart, Search, Sun, Moon, Home } from "lucide-react";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import { useTheme } from "./components/theme-provider";
import { motion } from "framer-motion";

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

  useEffect(() => {
    document.body.style.backgroundImage = theme === 'dark' 
      ? "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')"
      : "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }, [theme]);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header />
        <nav className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost">
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
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Link to="/cart">
              <Button variant="outline" className="mr-4">
                <ShoppingCart className="mr-2" size={20} />
                Cart ({cartItems.length})
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<ProductList searchTerm={searchTerm} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
          </Routes>
        </main>
      </div>
      <BackgroundAnimation />
    </Router>
  );
}

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-primary rounded-full opacity-10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
          }}
        />
      ))}
    </div>
  );
};

export default App;
