import React from 'react'
import "./ErrorBox.css"

export default function ErrorBox({ message }) {
  return (
    <div className='empty__error'>
        <h1>{ message }</h1>
    </div>
  )
}
