import React, { useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import "./EditModal.css"

function EditModal({ children, onClose, onSubmit }) {
    useEffect(() => {
        const checkEvent = (event) => {
            if (event.keyCode === 27) {
                onClose()
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
                <form className="editModal__form">
                    <h1 className="editModal__form__title">اطلاعات جدید را وارد نمایید</h1>
                    {children}
                    <button className="editModal__form__submit" onClick={onSubmit}>ثبت</button>
                </form>
            </motion.div>
        </AnimatePresence>

    )
}

export default EditModal