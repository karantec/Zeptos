import React, { useState, useRef, useEffect } from "react";
import '../../styles/Dashboard.css';

const Dash_category = ({ highlightButton }) => {
  const categories = [
    "all",
    "Agri products & Equipments",
    "Apparel & Fashion",
    "Automobile Spares & parts",
    "Bags and Luggage",
    "Beauty, Cosmetics & Care",
    "Books, Stationery & Office supplies",
    "Chemicals, dyes & solvents",
    "Construction supplies",
    "Drip Irrigation",
    "Electricals & lights",
    "Electronics & Computers",
    "Footwear",
    "Furniture & Interior Decorative",
    "Hardware & paints",
    "Home & kitchen appliances",
    "Industrial equipments",
    "Submersible motors & pumps",
    "Tiles & Ceramics"
  ];

  const imageSources = [
    "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    "category-img/agri-pump.png",
    "category-img/t-shirt.png",
    "category-img/automobile.png",
    "category-img/luggage.png",
    "category-img/cosmetics .png",
    "category-img/stationary.png",
    "category-img/chemicals.png",
    "category-img/construction.png",
    "category-img/Drip-irrigation.png",
    "category-img/electrical.png",
    "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    "category-img/footware.png",
    "category-img/furniture.png",
    "category-img/hardware.png",
    "category-img/appliances.png",
    "category-img/equipment.png",
    "category-img/submersible-motors-and-pumps.png",
    "category-img/tiles.png",
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);
  const scrl = useRef(null);

  const slide = (shift) => {
    if (scrl.current) {
      scrl.current.scrollLeft += shift;
      setScrollX(scrl.current.scrollLeft);

      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    }
  };

  useEffect(() => {
    if (
      scrl.current &&
      scrl.current.scrollWidth === scrl.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
    
    const handleResize = () => {
      scrollCheck();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollCheck = () => {
    if (scrl.current) {
      setScrollX(scrl.current.scrollLeft);
      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (highlightButton) {
      highlightButton(category);
    }
  };

  const categoryItems = categories.map((category, index) => (
    <li key={category + index} className="category-item">
      <div 
        className={`category-card ${selectedCategory === category ? 'selected' : ''}`}
        onClick={() => handleCategoryClick(category)}
      >
        <div className="category-img-container">
          <img
            src={imageSources[index]}
            alt={category}
            className="category-img"
          />
        </div>
        <p className="category-name">{category}</p>
      </div>
    </li>
  ));

  return (
    <div className="category-slider-container">
      <button 
        className={`nav-button prev ${scrollX <= 0 ? 'disabled' : ''}`} 
        onClick={() => slide(-200)}
        disabled={scrollX <= 0}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      
      <div className="categories-wrapper">
        <ul
          className="categories-list"
          ref={scrl}
          onScroll={scrollCheck}
        >
          {categoryItems}
        </ul>
      </div>
      
      <button 
        className={`nav-button next ${scrollEnd ? 'disabled' : ''}`} 
        onClick={() => slide(200)}
        disabled={scrollEnd}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default Dash_category;