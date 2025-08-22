import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id, size, color, quantity = 1, price, image, name) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity = quantity;
        return updated;
      }

      return [...prev, { id, size, color, quantity, price, image, name }];
    });
  };

  const increment = (id, size, color) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id == id && item.size == size && item.color == color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrement = (id, size, color) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id == id && item.size == size && item.color == color
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const removeFromCart = (id, size, color) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increment, decrement, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
