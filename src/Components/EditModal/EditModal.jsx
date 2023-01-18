import React, { Children, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import "./EditModal.css"

export default function EditModal({ Children, onClose, onSubmit }) {
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
                    <h1 className="editModal__form__title">اصلاعات جدید را وارد نمایید</h1>
                    {Children}

                    <button className="editModal__form__vubmit" onClick={onSubmit}>ثبت</button>
                </form>
            </motion.div>
        </AnimatePresence>

    )
}
