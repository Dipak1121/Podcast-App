import "./button.css"

import React from 'react'

const Button = ({text, onClick, disable, width}) => {
  return (
    <button onClick={onClick}
    disabled={disable}
    className="custom-btn"
    style={{width: width}}
    >{text}</button>
  )
}

export default Button
