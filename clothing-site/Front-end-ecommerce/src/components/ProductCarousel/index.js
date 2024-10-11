import React, {  useRef, useState } from "react";
import styles from "./index.module.css"; // Adjust the path as needed

const Slide = ({ image }) => {
    return (
        <li className={styles["slide-container"]}>
            <img
                src={image}
                alt={image}
                className={`${styles["slide-image"]} ${styles["position"]}`}
                
            />
        </li>
    );
};

const ProductCarousel = ({ coverImage }) => {
    const [currentIndex] = useState(1);

    

    

    const [magnifierStyle, setMagnifierStyle] = useState({});
    const overflowContainerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!overflowContainerRef.current) return;

        const imgPosition = overflowContainerRef.current.getBoundingClientRect();
        const imgHeight = overflowContainerRef.current.clientHeight;
        const imgWidth = overflowContainerRef.current.clientWidth;

        const posX = e.clientX - imgPosition.left;
        const posY = e.clientY - imgPosition.top;

        const percX = (posX / imgWidth) * 100;
        const percY = (posY / imgHeight) * 100;
        const perc = `${percX}% ${percY}%`;

        setMagnifierStyle({ backgroundPosition: perc });
    };

    return (
        <div className={styles["container"]}>
            <div className={styles["carousel-container"]}>
                <div
                    className={styles["overflow-container"]}
                    ref={overflowContainerRef}
                    onMouseMove={handleMouseMove}
                >
                    <ul
                        className={styles["carousel"]}
                        style={{
                            height: `calc(100% * 3)`,
                            transform: `translateY(calc(${0 * -100}%))`,


                        }}
                    >
                        <Slide key={coverImage} image={coverImage} />
                    </ul>

                    <div
                        role="img"
                        className={styles["magnifier"]}
                        style={{
                            backgroundImage: `url(${coverImage})`,
                            ...magnifierStyle,
                        }}
                    />
                </div>

                <nav
                    className={styles["active-bar"]}
                    style={{
                        transform: `translateX(calc(${currentIndex} * 100%))`,
                        width: `calc(100% / ${coverImage.size})`,
                    }}
                >
                </nav>
            </div>
        </div>
    );
};

export default ProductCarousel;
