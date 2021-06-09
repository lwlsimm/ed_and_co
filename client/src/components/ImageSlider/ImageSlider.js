import React, { useState } from 'react'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';
import './imageSlider.css';
import Typewriter from '../Typwriter/Typewriter';
import { useSelector } from 'react-redux';

const ImageSlider = () => {
  
  const stock = useSelector(state => state.stockReducer)
  const [current, setCurrent] = useState(0);
  const length = stock.length;
  

  if(!Array.isArray(stock) || length <= 0) {
    return null;
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
 
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <section className="slider">
      
      {stock.map((slide, index) => {
        return (
          
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (
              <div className="displayedSlide">
              <Typewriter product={stock[index]}
              mode={'Slider'}/>
              <div className="slideButtons">
                <FaArrowAltCircleLeft className="arrow left-arrow" onClick={prevSlide}/>
                <FaArrowAltCircleRight className="arrow right-arrow" onClick={nextSlide}/>
              </div>
              
              </div>
            )
            }
            
          </div>
        )
      })}
    </section>
  )
  
};

export default ImageSlider;
