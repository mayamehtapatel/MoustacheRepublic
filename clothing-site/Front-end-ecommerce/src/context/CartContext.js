// Manage cart state

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);
const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

const CartProvider = ({ children }) => {
  const [items, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
    const [lastItemAdded, setLastItemAdded] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, size) => {
    const existingItem = items.find(
      (item) => item.id === product.id && item.size === size
    );
    if (existingItem) {
      setCart(
          items.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...items, { ...product, size, quantity: 1 }]);
    }

      setLastItemAdded(product);
  };

    const removeSingleItem = (product, size) => {
        const existingItem = items.find(
            (item) => item.id === product.id && item.size === size
        );
        if (existingItem && existingItem.quantity > 1) {
            setCart(
                items.map((item) =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        } else {
            removeItem(product.id, size)
        }
    };

    const removeItem = (productId, size) => {
        setCart((prevItems) => {
            // Filter out the item that matches the productId and size
            return prevItems.filter(
                (item) => !(item.id === productId && item.size === size)
            );
        });
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const getNumberOfItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };


    const getCartPrice = () => {
        return items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };


  return (
      <CartContext.Provider
          value={{
            items,
            lastItemAdded,
            isCartOpen,
            removeSingleItem,
            addItem,
            removeItem,
            getNumberOfItems,
            openCart,
            closeCart,
            getCartPrice,
          }}
      >
        {children}
      </CartContext.Provider>
  );
};

export { useCart, CartProvider };