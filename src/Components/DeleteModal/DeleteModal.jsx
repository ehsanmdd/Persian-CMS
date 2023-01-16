import React from 'react'
import ReactDOM  from 'react-dom'
import "./DeleteModal.css"

function DeleteModal({ submitAction, cancleAction }) {
  return ReactDOM.createPortal(
    <div className="modal__parent active">
        <div className="modal__delete">
            <h1 className="modal__delete--title">آیا از حذف اطمینان دارید</h1>
            <div className="modal__delete__btns">
                <button className="modal__delete__btn accept--btn"onClick={() => submitAction()}>بله</button>
                <button className="modal__delete__btn reject--btn"onClick={() => cancleAction()}>خیر</button>
            </div>
        </div>
    </div>,document.getElementById("modals--parent")
  )
}

export default DeleteModal