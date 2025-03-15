// container 1

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Home_styles/Layer1.css'

export default function Layer1() {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="container-one">
            <div className="s-main">
                <div className="mt-5 s-title fw-normal">Empowering MSMEs with Seamless B2B Commerce 🚀</div>
                <div className="m-title">Connect, Trade, Grow with our unified platform</div>

                <form onSubmit={handleSearch}>
                    <div className="s-search">
                        <div className="search-container">
                            <div className='search-icon'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/anqzffqz.json"
                                    trigger="loop"
                                    delay="2000"
                                    state="in-reveal"
                                    style={{ width: '30px', height: '30px' }}>
                                </lord-icon>
                            </div>
                            <input
                                type="text"
                                placeholder="Search on Bejiness.com"
                                className="search-input"
                                defaultValue={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button className="search-button" type='submit'>
                                <img
                                    alt="Search"
                                    src="https://www.pngall.com/wp-content/uploads/13/Search-Button-White-PNG.png"
                                />
                                <div className="m-2 search-button-text">Search</div>
                            </button>
                        </div>
                    </div>
                </form>
                {/* <div className="s-search-suggetion">
          <div className="responsive-container">
            <button className="custom-button" >
              <img src="https://production-uploads-cdn.anar.biz/uploads/image/image/6690959/logo_saree.png" alt="Icon" className="icon" />
              <span className="button-text">Click Me</span>
            </button>
            <button className="custom-button" >
              <img src="https://production-uploads-cdn.anar.biz/uploads/image/image/6690959/logo_saree.png" alt="Icon" className="icon" />
              <span className="button-text">Click Me</span>
            </button>
            <button className="custom-button" >
              <img src="https://production-uploads-cdn.anar.biz/uploads/image/image/6690959/logo_saree.png" alt="Icon" className="icon" />
              <span className="button-text">Click Me</span>
            </button>



            <button className="custom-button" >
              <img src="https://production-uploads-cdn.anar.biz/uploads/image/image/6690959/logo_saree.png" alt="Icon" className="icon" />
              <span className="button-text">Click Me</span>
            </button>
            <button className="custom-button" >
              <img src="https://production-uploads-cdn.anar.biz/uploads/image/image/6690959/logo_saree.png" alt="Icon" className="icon" />
              <span className="button-text">Click Me</span>
            </button>
            <button className="custom-button" >
              <img src="https://production-uploads-cdn.anar.biz/uploads/image/image/6690959/logo_saree.png" alt="Icon" className="icon" />
              <span className="button-text">Click Me</span>
            </button>
            <button className="custom-button" >
              <img src="https://production-uploads-cdn.anar.biz/uploads/image/image/6690959/logo_saree.png" alt="Icon" className="icon" />
              <span className="button-text">Click Me</span>
            </button>
            <button className="custom-button" >
              <img src="https://production-uploads-cdn.anar.biz/uploads/image/image/6690959/logo_saree.png" alt="Icon" className="icon" />
              <span className="button-text">Click Me</span>
            </button>
            <button className="custom-button" >
              <img src="https://production-uploads-cdn.anar.biz/uploads/image/image/6690959/logo_saree.png" alt="Icon" className="icon" />
              <span className="button-text">Click Me</span>
            </button>
          </div>

        </div> */}
                        <div className="m-title" style={{marginTop:45, display:'flex', justifyContent:'center', marginLeft:'-40px'}}>Get Started for Free</div>
            </div>
            {/* <div className="img-div">
        <img src="/home/home-img1.png" alt="" />
      </div> */}
        </div>
    )
}
