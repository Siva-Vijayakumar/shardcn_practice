import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "./components/ui/button.jsx";
import { Input } from "./components/ui/input";
import { ShoppingCart, Search, Sun, Moon, Home } from "lucide-react";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { useTheme } from "./components/theme-provider";

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
        <AnimatedBackground theme={theme} />
      </div>
    </Router>
  );
}

const AnimatedBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colorPalettes = {
      light: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
        '#F7DC6F', '#82E0AA', '#D7BDE2', '#FAD7A0', '#FF9FF3'
      ],
      dark: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
        '#F7DC6F', '#82E0AA', '#D7BDE2', '#FAD7A0', '#FF9FF3'
      ]
    };

    const blobs = [];
    const blobCount = 5;

    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 100,
        xSpeed: Math.random() * 2 - 1,
        ySpeed: Math.random() * 2 - 1,
        color: colorPalettes[theme][Math.floor(Math.random() * colorPalettes[theme].length)],
      });
    }

    const drawBlob = (x, y, radius, color) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, theme === 'dark' ? '#1a1a2e' : '#f0f0f0');
      gradient.addColorStop(1, theme === 'dark' ? '#16213e' : '#e0e0e0');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob) => {
        blob.x += blob.xSpeed;
        blob.y += blob.ySpeed;

        if (blob.x < -blob.radius || blob.x > canvas.width + blob.radius) blob.xSpeed *= -1;
        if (blob.y < -blob.radius || blob.y > canvas.height + blob.radius) blob.ySpeed *= -1;

        drawBlob(blob.x, blob.y, blob.radius, blob.color);
      });

      ctx.globalCompositeOperation = 'screen';

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default App;
