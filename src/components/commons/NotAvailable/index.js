import React from "react";
import PropTypes from 'prop-types' 
import './index.css'

export default function NotAvailable({className, style, text='No Disponible'}) {
    
  return(
    <div className={`c-not-available ${className}`} style={style}>
      <span>{text}</span>
    </div>
  )
}
NotAvailable.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}