import { CardExample } from "../../assets/images";
import { useState, useEffect, useRef } from "react";
import "./Carroussel.css";

const Carroussel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const trackRef = useRef(null);
    const images = [CardExample, CardExample, CardExample];
    const totalSlides = images.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [totalSlides]);

    useEffect(() => {
        if (trackRef.current) {
            const translateX = currentSlide * 100;
            trackRef.current.style.transform = `translateX(-${translateX}vw)`;
        }
    }, [currentSlide]);

    return (
        <div className="carroussel-container">
            <div className="carroussel-track" ref={trackRef}>
                {images.map((item, index) => (
                    <div className="carroussel-card" key={index}>
                        <img 
                            src={item} 
                            alt={`Card ${index + 1}`}
                            className="carroussel-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carroussel;