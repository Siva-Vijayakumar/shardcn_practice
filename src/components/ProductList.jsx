import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const products = [
  { id: 1, name: "Smartphone", price: 599, image: "https://picsum.photos/id/1/300/200", description: "A powerful smartphone with the latest features." },
  { id: 2, name: "Laptop", price: 999, image: "https://picsum.photos/id/2/300/200", description: "High-performance laptop for work and play." },
  { id: 3, name: "Headphones", price: 199, image: "https://picsum.photos/id/3/300/200", description: "Noise-cancelling headphones for immersive audio." },
  { id: 4, name: "Smartwatch", price: 299, image: "https://picsum.photos/id/4/300/200", description: "Track your fitness and stay connected on the go." },
  { id: 5, name: "Camera", price: 499, image: "https://picsum.photos/id/5/300/200", description: "Capture life's moments in stunning detail." },
  { id: 6, name: "Tablet", price: 399, image: "https://picsum.photos/id/6/300/200", description: "Versatile tablet for productivity and entertainment." },
  { id: 7, name: "Gaming Console", price: 499, image: "https://picsum.photos/id/7/300/200", description: "Next-gen gaming console for immersive gameplay." },
  { id: 8, name: "Smart Speaker", price: 99, image: "https://picsum.photos/id/8/300/200", description: "Voice-controlled speaker with AI assistant." },
  { id: 9, name: "Fitness Tracker", price: 79, image: "https://picsum.photos/id/9/300/200", description: "Monitor your health and fitness goals." },
  { id: 10, name: "Wireless Earbuds", price: 159, image: "https://picsum.photos/id/10/300/200", description: "True wireless earbuds with premium sound." },
  { id: 11, name: "4K TV", price: 799, image: "https://picsum.photos/id/11/300/200", description: "Ultra HD smart TV for cinematic experiences." },
  { id: 12, name: "Electric Scooter", price: 349, image: "https://picsum.photos/id/12/300/200", description: "Eco-friendly electric scooter for urban commuting." },
];

const ProductList = ({ searchTerm, addToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="overflow-hidden backdrop-blur-sm bg-opacity-70 bg-white dark:bg-opacity-70 dark:bg-gray-800 shadow-lg">
            <CardHeader className="p-0">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-2xl font-bold mb-2">{product.name}</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
              <p className="text-3xl font-bold text-primary">${product.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg" onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;
