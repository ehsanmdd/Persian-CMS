import React, { useState, useEffect } from 'react'
import { BiCommentDetail } from 'react-icons/bi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { BiCommentEdit } from 'react-icons/bi';

import "./Comments.css"
import ErrorBox from "../ErrorBox/ErrorBox"
import DetailsModal from '../DetailsModal/DetailsModal';
import DeleteModal from '../DeleteModal/DeleteModal';

function Comments() {

  const [allComments, setAllComments] = useState([])
  const [isShowCommentModal, setIsShowCommentModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [mainCommentBody, setMainCommentBody] = useState("")
  const [commentID, setCommentID] = useState('')

  useEffect(() => {
    getAllComments()
  }, [])

  function getAllComments () {
    fetch('http://localhost:8000/api/comments')
    .then(res => res.json())
    .then(comments => { setAllComments(comments) })
  }

  const closeCommentModal = () => setIsShowCommentModal(false)
  const closeDeleteModal = () => setIsShowDeleteModal(false)

  const deleteComment = () => {
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => {
        getAllComments()
        setIsShowDeleteModal(false)
      })

    setIsShowDeleteModal(false)
  }

  return (
    <div className='table__container'>


      {allComments.length ? (
        <table className="table__content">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map(comment => (
              <tr key={comment.id}>
                <td>{comment.userID} </td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    onClick={() => {
                      setMainCommentBody(comment.body)
                      setIsShowCommentModal(true)
                    }}
                  >
                    <BiCommentDetail />
                  </button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button>
                    <BiCommentEdit />
                  </button>
                  <button >
                    <MdOutlineQuestionAnswer />
                  </button>
                  <button className='table__content--delete' onClick={() => {
                    setCommentID(comment.id)
                    setIsShowDeleteModal(true)
                  }}>
                    <MdOutlineDeleteForever />
                  </button>
                  <button className='table__content--accept'>
                    <AiOutlineCheck />
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      ) : (
        <ErrorBox message="هیچ پیامی یافت نشد" />
      )}

      {
        isShowCommentModal &&
        <DetailsModal onHide={closeCommentModal}>
          <p
            className='text-modal'>{mainCommentBody}</p>
          <button
            className='text-modal-close-btn'
            onClick={closeCommentModal}
          >بستن</button>
        </DetailsModal>
      }

      {
        isShowDeleteModal &&
        <DeleteModal
          cancleAction={closeDeleteModal}
          submitAction={deleteComment}
        />
      }
    </div>
  )
}


export default Comments