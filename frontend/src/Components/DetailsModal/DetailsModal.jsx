import React, { useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import "./DetailsModal.css"
import { wait } from '@testing-library/user-event/dist/utils'

function DetailsModal({ onHide , children }) {

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
         { children }
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DetailsModal