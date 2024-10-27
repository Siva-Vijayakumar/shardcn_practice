import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-2"
      >
        ShopSmart
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl text-muted-foreground"
      >
        Your one-stop shop for amazing products
      </motion.p>
    </header>
  );
};

export default Header;
