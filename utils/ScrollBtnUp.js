

import React, { useState, useEffect } from 'react';
import { BsArrowUpSquare } from "react-icons/bs";





const Index = () => {



  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const calculateScrollDistance = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / windowHeight) * 100;

    setScrollPercentage(Math.round(scrolled));
  };

  useEffect(() => {
    const handleScroll = () => {
      calculateScrollDistance();
      toggleVisibility();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 130) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <div>
      {isVisible && (
        <button
          className='btn btn-primary'
          onClick={scrollToTop}
          style={{ position: 'fixed', bottom: '20px', right: '40px', width: '110px' }}>
          {scrollPercentage}% <BsArrowUpSquare  className='fs-5 ms-3' style={{position: 'relative', top:'-2px'}}/>
        </button>
      )}
    </div>
  );
};

export default  Index

