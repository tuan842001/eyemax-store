import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const allOject = {
    cart,
    setCart,
  };

  return (
    <CartContext.Provider value={allOject}> {children}</CartContext.Provider>
  );
};
