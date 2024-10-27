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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
