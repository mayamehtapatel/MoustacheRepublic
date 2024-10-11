import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext'; // Adjust the path as needed
import styles from './index.module.css'; // Adjust the path as needed
// import { Allerta_Stencil } from '@next/font/google'; // Note: You'll need to handle fonts differently in React
// const allerta = Allerta_Stencil({ weight: '400', subsets: ['latin'] });

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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

const Header = ({ isMobileMenuOpen, toggleIsMobileMenuOpen }) => {
    const { items, getNumberOfItems, openCart, lastItemAdded, isCartOpen } = useCart();
    const [showToaster, setShowToaster] = useState(false);

    const handleCloseToaster = () => {
        setShowToaster(false);
    };

    useEffect(() => {
        if (getNumberOfItems() > 0 && !isCartOpen) {
            setShowToaster(true);
        }
    }, [items, isCartOpen]);

    return (
        <header className={styles.header}>
            <h1 >
                <a href="/">TestShop</a>
            </h1>
            <button
                aria-label="cart"
                data-number-of-items={getNumberOfItems()}
                onClick={openCart}
            >
                My Cart

            </button>
            {showToaster && lastItemAdded && !isCartOpen && (
                <Toaster
                    key={getNumberOfItems()}
                    onClose={handleCloseToaster}
                    itemName={lastItemAdded.name}
                />
            )}
        </header>
    );
};

export default Header;
