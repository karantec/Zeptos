// scroll categories

import React, { useRef, useEffect } from "react";

import '../Home_styles/Layer3.css'
import data from "./category.json";

const Layer3 = () => {
    const scrl = useRef();
    const animationFrameId = useRef(null);

    useEffect(() => {
        const scrollList = () => {
            if (scrl.current) {
                if (scrl.current.scrollLeft >= (scrl.current.scrollWidth / 2)) {
                    scrl.current.scrollLeft = 0;
                } else {
                    scrl.current.scrollLeft += 1;
                }
            }
            animationFrameId.current = requestAnimationFrame(scrollList);
        };

        // Set initial scroll position to half the scroll width to start the animation in the middle
        if (scrl.current) {
            scrl.current.scrollLeft = scrl.current.scrollWidth / 4;
        }

        // Start the animation
        animationFrameId.current = requestAnimationFrame(scrollList);

        // Clean up the animation frame on component unmount
        return () => cancelAnimationFrame(animationFrameId.current);
    }, []);

    return (
        <>
            <div className="why-choose-title">
                <p>All Categories</p>
            </div>
            <div className="s-App">
                <ul className="s-ul" ref={scrl}>
                    {[...data.fruits, ...data.fruits].map((data, i) => (
                        <li key={i}>
                            {data}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Layer3;
