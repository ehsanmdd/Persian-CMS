import React from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from "framer-motion"
import "./DeleteModal.css"

function DeleteModal({ submitAction, cancleAction, title}) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div className="modal__parent active"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div className="modal__delete">
          <h1 className="modal__delete--title">{title}</h1>
          <motion.div className="modal__delete__btns">
            <button className="modal__delete__btn accept--btn" onClick={() => submitAction()}>بله</button>
            <button className="modal__delete__btn reject--btn" onClick={() => cancleAction()}>خیر</button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,document.getElementById("modals--parent")
  )
}

export default DeleteModal