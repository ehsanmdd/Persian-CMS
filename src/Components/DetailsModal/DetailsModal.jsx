import React, { useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import "./DetailsModal.css"
import { wait } from '@testing-library/user-event/dist/utils'

function DetailsModal({ onHide }) {

  useEffect(() => {
    const checkEvent = (event) => {
      if (event.keyCode === 27) {
        onHide()
      }
    }

    window.addEventListener("keydown", checkEvent)
    return () => window.removeEventListener("keydown", checkEvent) // Remove EventListener from client cache

  })

  return (
    <AnimatePresence>
      <motion.div className='modal__parent active'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="detailes__modal ">
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DetailsModal