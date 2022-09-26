import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
//import styles
import './PlanCards.css'
import { Rating, Skeleton } from '@mui/material'

//component
export default function PlanCards({style, dataSource, cardsToShow, onClick}) {
  return(
    <Carousel style={style} data={dataSource || [{id: 0}]} cardsToShow={cardsToShow} onClick={onClick}/>
    
  )
}

const Card = ({e, i, onClick}) => {
  
  let allUsers = 1200;
  let usersPerPlan = 590;
  let stars = 10;
const handleClick = (e) =>{
if(onClick){
  onClick(e)
}
}
return (
  <>
  <li className={`card w-card color-${e.price}`}>
    <div >
                <div className="card-header">
                  <div className="w-title">
                    {e.name ? e.name : 'No Disponible'}
                  </div>
                  <div className="w-price">
                    {e.name ? e.price === 0 ? 'Gratis' : e.price : <Skeleton />}
                  </div>
                    {e.name ? <Rating style={{zIndex: 100}} precision={0.1} readOnly name="customized-10" defaultValue={(usersPerPlan * stars / allUsers)} max={stars} /> : <Skeleton />}
                  <div className="container-button">
                    {e.name ?<a className="w-button" onClick={handleClick}>Contratar</a> : <Skeleton />}
                  </div>
                </div>
                <div className="card-content">
                  {e.services && e.services.length > 0 && e.services.map((item, i)=>{
                    if(i <= 2){
                      return(
                        <div key={i} className="w-item">
                        <span>{item.frequency}</span> {item.service.name.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                      )
                    }
                  })}
                 
                  {!e.name && <Skeleton />}
                  {!e.name && <Skeleton />}
                </div>
      </div>
  </li>
  </>
)
}

const Carousel = ({style, data, cardsToShow, onClick}) => {
  
const [moveClass, setMoveClass] = useState('');
const [carouselItems, setCarouselItems] = useState([]);
useEffect(() => {
  let fillerItems = []
  for (let index = data?.length; index < (cardsToShow + 2); index++) {
    fillerItems = [...fillerItems, {id: index}]
  } 
  setCarouselItems([...data, ...fillerItems])
}, [data])
useEffect(() => {
  document.documentElement.style.setProperty('--num', carouselItems.length);
  document.documentElement.style.setProperty('--cardsToShow', cardsToShow);
}, [carouselItems])

const handleAnimationEnd = () => {
  if(moveClass === 'prev'){
    shiftNext([...carouselItems]);
  }else if(moveClass === 'next'){
    shiftPrev([...carouselItems]);
  }
  setMoveClass('')
}

const shiftPrev = (copy) => {
  let lastcard = copy.pop();
  copy.splice(0, 0, lastcard);
  setCarouselItems(copy);
}

const shiftNext = (copy) => {
  let firstcard = copy.shift();
  copy.splice(copy.length, 0, firstcard);
  setCarouselItems(copy);
}

return (
  <div style={style} className="carouselwrapper module-wrapper">
    <h3>PLANES</h3>
    <div className="ui-left">
      <button onClick={() => setMoveClass('next')} className="prev">
        <span className="material-icons">chevron_left</span>
      </button>
      </div>
      <div className="ui-right">
      <button onClick={() => setMoveClass('prev')} className="next">
        <span className="material-icons">chevron_right</span>
      </button>
    </div>
      <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousel`}>
        {carouselItems.map((e, i) => 
          <Card key={i} i={i} e={e} onClick={onClick}/>
        )}
      </ul>
  </div>
)
}

// PropTypes
PlanCards.propTypes = {
  style: PropTypes.object,
  dataSource: PropTypes.array.isRequired,
  cardsToShow: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}
Carousel.propTypes = {
  style: PropTypes.object,
  data: PropTypes.array,
  cardsToShow: PropTypes.number,
  onClick: PropTypes.func,
}
Card.propTypes = {
  e: PropTypes.object,
  i: PropTypes.number,
  onClick: PropTypes.func,
}