
import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [savedItems, setSavedItems] = useState({}); // ✅ OBJECT

  // ➕ ADD
  const addItem = (product) => {
    const id = product._id;

    setCart(prev => ({
      ...prev,
      [id]: {
        ...product,
        qty: prev[id]?.qty ? prev[id].qty + 1 : 1,
      },
    }));

    setSavedItems(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const increaseQty = (id) => {
    setCart(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], qty: prev[id].qty + 1 },
      };
    });
  };

  const decreaseQty = (id) => {
    setCart(prev => {
      if (!prev[id]) return prev;

      if (prev[id].qty === 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }

      return {
        ...prev,
        [id]: { ...prev[id], qty: prev[id].qty - 1 },
      };
    });
  };

  // ❤️ SAVE FOR LATER
  const saveForLater = (product) => {
    const id = product._id;

    setSavedItems(prev => ({
      ...prev,
      [id]:{ ...product},
    }));

    setCart(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // 🔁 MOVE BACK
  const moveToCart = (product) => {
    addItem(product);
    setSavedItems(prev => {
      const copy = { ...prev };
      delete copy[product._id];
      return copy;
    });
  };

  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        savedItems,
        addItem,
        increaseQty,
        decreaseQty,
        saveForLater,
        moveToCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
