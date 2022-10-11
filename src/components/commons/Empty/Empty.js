import React from 'react'
import PropTypes from 'prop-types'
import emptyIcon from '../../../assets/emptyIcon/empty.svg'
import './Empty.css'
export default function Empty({text= 'No se encontraron datos', style}) {
    
    return(
        <div className='container-empty'>
            <img src={emptyIcon}/>
            <span>{text}</span>
        </div>
    )
}
Empty.propTypes = {
    text: PropTypes.string,
    style: PropTypes.object,
  }