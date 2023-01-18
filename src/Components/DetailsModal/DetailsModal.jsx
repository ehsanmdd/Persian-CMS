import React, { useEffect } from 'react'
import "./DetailsModal.css"

function DetailsModal({ onHide }) {

  useEffect(() => {
    const checkEvent = (event) => {
      if (event.keyCode === 27) {
        onHide()
      }
    }

    window.addEventListener("keydown" , checkEvent)
    return () => window.removeEventListener("keydown" , checkEvent) // Remove EventListener from client cache

  })

  return (
    <div className='modal__parent active'>
      <div className="detailes__modal ">
        <table className="details__modal__table">
          <thead>
            <tr>
              <th>اسم</th>
              <th>قیمت</th>
              <th>محبوبیت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>لپتاپ</td>
              <td>12.000.000</td>
              <td>91</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DetailsModal