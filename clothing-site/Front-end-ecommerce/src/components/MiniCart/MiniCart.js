import React, { useContext } from 'react';
import { useCart } from '../../context/CartContext';


const MiniCart = () => {
  const { cart } = useContext(useCart);
    const { items, getNumberOfItems, openCart } = useCart();

  return (
    <div className="mini-cart">
      <h2>Mini Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <p>{item.title} ({item.size}) x {item.quantity}</p>
            <p>${item.price * item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MiniCart;
