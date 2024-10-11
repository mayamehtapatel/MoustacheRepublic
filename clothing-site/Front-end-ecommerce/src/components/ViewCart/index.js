import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useCart } from '../../context/CartContext';
import styles from "./index.module.css";

const ViewCart = () => {
  const { closeCart, items, removeItem, addItem, getNumberOfItems, removeSingleItem, getCartPrice  } = useCart();
  const [startExitingAnimation, setStartExitingAnimation] = useState(false);
  return ReactDOM.createPortal(
      <div
          className={`${styles["backdrop"]} ${
              startExitingAnimation ? styles["exit"] : ""
          }`}
          onClick={() => setStartExitingAnimation(true)}
          onAnimationEnd={() => {
            if (startExitingAnimation) {
              closeCart();
            }
          }}
      >
        <div
            className={`${styles["slider"]} ${
                startExitingAnimation ? styles["exit"] : ""
            }`}
            onClick={(e) => e.stopPropagation()}
        >
          <header className={styles["header"]}>
            <h2 className={styles["title"]}>Shopping Bag</h2>
            <button
                className={styles["close-button"]}
                onClick={() => closeCart()}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
              </svg>
            </button>
          </header>

          {getNumberOfItems() > 1 ?(
              <p className={styles["number-of-items"]}>{getNumberOfItems()} items</p>
          ) : (
            <p className={styles["number-of-items"]}> Your Cart is empty
        </p>
        )}


        <ul className={styles["list-of-items"]}>
            {Array.from(items).map((cartItem) => {
              return (
                  <li key={cartItem.size} className={styles["item"]}>
                    <img
                        height={150}
                        width={150}
                        src={cartItem.imageURL}
                        alt="Product"
                        className={styles["item-image"]}
                    />
                    <div className={styles["item-details-container"]}>
                      <h3 className={styles["item-title"]}>{cartItem.title}</h3>
                      <p className={styles["item-price"]}>
                        $ {cartItem.price} X $ {cartItem.price} : <span className={styles["item-price-total"]}>$ {cartItem.price * cartItem.quantity}</span>
                      </p>

                      <p className={styles["item-size"]}>
                        <label>Size  :</label><strong>  {cartItem.size}</strong>
                      </p>

                      <div className={styles["quantity-container"]}>
                        <p className={styles["quantity-text"]}>Qty:</p>
                        <button
                            className={styles["quantity-button"]}
                            onClick={() => removeSingleItem(cartItem, cartItem.size)}
                        >
                          -
                        </button>
                        <p>{cartItem.quantity}</p>
                        <button
                            className={styles["quantity-button"]}
                            onClick={() => addItem(cartItem, cartItem.size)}

                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                        className={styles["remove-button"]}
                        onClick={() => removeItem(cartItem.id, cartItem.size)}
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                      </svg>
                    </button>
                  </li>
              );
            })}
          </ul>
          {getNumberOfItems() > 1 && (
              <p>
                Subtotal ({getNumberOfItems()} item{getNumberOfItems() > 1 && "s"})
                <span className={styles["checkout-price"]}>
              ${getCartPrice()}
            </span>
              </p>
          )}
        </div>
      </div>,
      document.getElementById("root") // Change to the correct root element
  );
};

export default ViewCart;

