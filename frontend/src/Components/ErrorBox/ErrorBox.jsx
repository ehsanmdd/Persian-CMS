import React from 'react'
import "./ErrorBox.css"

function ErrorBox({ message }) {
  return (
    <div className='empty__error'>
        <h1>{ message }</h1>
    </div>
  )
}

export default ErrorBox