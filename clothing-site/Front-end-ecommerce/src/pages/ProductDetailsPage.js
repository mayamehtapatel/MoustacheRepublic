import React, { useEffect, useState } from "react";
import styles from "../styles/productDetails.module.css";
import { useCart } from "../context/CartContext";
import { getProductDetails } from '../services/productService';
import ProductCarousel from "../components/ProductCarousel";
const Toaster = ({ onClose }) => {
    const [startExitingAnimation, setStartExitingAnimation] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => setStartExitingAnimation(true), 3000);
        return () => clearTimeout(timeoutId);
    }, [onClose]);

    return (
        <div
            className={`${styles["toaster-container"]} ${startExitingAnimation ? styles["remove"] : ""}`}
            onAnimationEnd={() => startExitingAnimation && onClose()}
        >
            <p className={styles["toaster-text"]}>
                Please select a size.
            </p>
        </div>
    );
};
const ProductPage = () => {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
   
    const [showToaster, setShowToaster] = useState(false);

    const handleCloseToaster = () => {
        setShowToaster(false);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductDetails();
            setProduct(data);
        };
        fetchProduct();
    }, []);

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev === 1 ? 1 : prev - 1));

    useEffect(() => {
        setQuantity(1);
    }, [product]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setShowToaster(true);
        } else {
           
            addItem(product, selectedSize, quantity); // Assuming addItem takes product, size, and quantity
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {showToaster && (
                <Toaster
                    onClose={handleCloseToaster}
                />
            )}
            <div className={styles["container"]}>
                <ProductCarousel coverImage={product.imageURL} />
                <div className={styles["product-details-container"]}>
                    <h2 className={styles["product-title"]}>{product.title}</h2>
                    <p className={styles["product-price"]}>$ {product.price}</p>
                    <h3 className={styles["product-description-title"]}>Description</h3>
                    <p className={styles["product-description"]}>
                        {product.description}
                    </p>

                    {/* Size Selection */}
                    <div className={styles["size-selection"]}>
                        <label>Size:</label><strong>{selectedSize}</strong>
                        <div className={styles["size-selection-buttons"]}>
                        {product.sizeOptions.map((size) => (
                            <button
                                key={size.id}
                                value={size.label}
                                className={`${selectedSize === size.label ? styles["active-size-button"] : styles["size-button"]}`}
                                onClick={() => setSelectedSize(size.label)} // Use an arrow function
                            >
                                {size.label}
                            </button>
                        ))}
                        </div>


                      
                    </div>

                    <div className={styles["add-to-cart-container"]}>
                        <div className={styles["add-to-cart-number-picker"]}>
                            <button
                                className={styles["add-to-cart-number-picker-button"]}
                                onClick={decrementQuantity}
                            >
                                -
                            </button>
                            <p>{quantity}</p>
                            <button
                                className={styles["add-to-cart-number-picker-button"]}
                                onClick={incrementQuantity}
                            >
                                +
                            </button>
                        </div>
                        <button
                            className={styles["add-to-cart-button"]}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
