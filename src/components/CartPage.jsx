import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X } from 'lucide-react';

const CartPage = ({ cartItems, removeFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-4xl font-bold mb-6 text-primary">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-xl text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <Card className="flex items-center backdrop-blur-sm bg-opacity-70 bg-white dark:bg-opacity-70 dark:bg-gray-800 shadow-lg">
                <CardHeader className="flex-shrink-0 w-1/4">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="text-2xl font-bold mb-2">{item.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
                  <p className="text-2xl font-bold text-primary">${item.price}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" onClick={() => removeFromCart(item.id)}>
                    <X size={24} />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
          <div className="mt-6">
            <p className="text-2xl font-bold mb-4">Total: <span className="text-primary">${totalPrice.toFixed(2)}</span></p>
            <Button className="text-lg px-8 py-3">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CartPage;
