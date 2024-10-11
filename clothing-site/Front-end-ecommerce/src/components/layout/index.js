import React, { ReactNode, useEffect, useState } from 'react';
import styles from './index.module.css'; // Adjust the path as needed
import { useCart } from '../../context/CartContext'; // Adjust the path as needed
import Header from './Header'; // Adjust the path as needed
import ViewCart from "../ViewCart";

const MobileMenu = () => {
  return (
      <div className={styles["nav-modal"]}>
        <button aria-label="account">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" />
          </svg>
          my account
        </button>
        <button aria-label="logout">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z" />
          </svg>
          logout
        </button>
      </div>
  );
};

const Toaster = ({ onClose, itemName }) => {
  const [startExitingAnimation, setStartExitingAnimation] = useState(false);
  const { openCart } = useCart();

  useEffect(() => {
    const timeoutId = setTimeout(() => setStartExitingAnimation(true), 3000);
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
      <div
          className={`${styles["toaster-container"]} ${startExitingAnimation ? styles["remove"] : ""}`}
          onAnimationEnd={() => startExitingAnimation && onClose()}
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
        </svg>
        <p className={styles["toaster-text"]}>
          <strong>{itemName}</strong> added successfully to your shopping bag
        </p>
        <button className={styles["toaster-button"]} onClick={openCart}>
          view cart
        </button>
      </div>
  );
};

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isCartOpen } = useCart();

  const toggleIsMobileMenuOpen = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [window.location.pathname]); // Update to handle route changes in React

  return (
      <>
        <Header
            isMobileMenuOpen={isMobileMenuOpen}
            toggleIsMobileMenuOpen={toggleIsMobileMenuOpen}
        />
        <main>{isMobileMenuOpen ? <MobileMenu /> : children}</main>
         {isCartOpen && <ViewCart />}
      </>
  );
};

export default Layout;
