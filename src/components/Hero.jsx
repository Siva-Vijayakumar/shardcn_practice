import { motion } from "framer-motion";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20 mb-12 bg-black bg-opacity-30 rounded-lg shadow-lg"
    >
      <h1 className="text-5xl font-bold mb-4 text-white text-shadow">Welcome to ShopSmart</h1>
      <p className="text-xl mb-8 text-gray-200 text-shadow">Discover amazing products at unbeatable prices!</p>
      <Button size="lg" className="bg-white text-black hover:bg-gray-200 transition-colors duration-300">
        Shop Now
      </Button>
    </motion.div>
  );
};

export default Hero;
