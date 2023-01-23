import React, { useState, useEffect } from 'react'
import { BiCommentDetail } from 'react-icons/bi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { BiCommentEdit } from 'react-icons/bi';
import { TfiClose } from 'react-icons/tfi';

import "./Comments.css"
import ErrorBox from "../ErrorBox/ErrorBox"
import DetailsModal from '../DetailsModal/DetailsModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from "../EditModal/EditModal"

function Comments() {

  const [allComments, setAllComments] = useState([])
  const [isShowCommentModal, setIsShowCommentModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditeModal] = useState(false)
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
  const [isShowRejectModal, setIsShowRejectModal] = useState(false)
  const [mainCommentBody, setMainCommentBody] = useState("")
  const [commentID, setCommentID] = useState('')

  useEffect(() => {
    getAllComments()
  }, [])

  function getAllComments() {
    fetch('http://localhost:8000/api/comments')
      .then(res => res.json())
      .then(comments => { setAllComments(comments) })
  }

  const closeCommentModal = () => setIsShowCommentModal(false)
  const closeDeleteModal = () => setIsShowDeleteModal(false)
  const closeEditModal = () => setIsShowEditeModal(false)
  const closeAcceptModal = () => setIsShowAcceptModal(false)
  const closeRejectModal = () => setIsShowRejectModal(false)

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

  const updateCommentBody = (event) => {
    event.preventDefault()

    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        body: mainCommentBody
      })
    })
      .then(res => res.json())
      .then(result => {
        getAllComments()
        closeEditModal()
      })
  }

  const acceptComment = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(resualt => {
        getAllComments()
        setIsShowAcceptModal(false)
      })

    setIsShowAcceptModal(false)
  }

  const rejectComment = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentID}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        getAllComments()
        setIsShowRejectModal(false)
      })

    setIsShowAcceptModal(false)
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
                  <button onClick={() => {
                    setIsShowEditeModal(true)
                    setMainCommentBody(comment.body)
                    setCommentID(comment.id)
                  }}>
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
                  {
                    comment.isAccept === 0 && (
                      <button className='table__content--accept'
                        onClick={() => {
                          setCommentID(comment.id)
                          setIsShowAcceptModal(true)
                        }}
                      >
                        <AiOutlineCheck />
                      </button>
                    )
                  }
                  {
                    comment.isAccept === 1 && (
                      <button className='table__content--delete'
                        onClick={() => {
                          setCommentID(comment.id)
                          setIsShowRejectModal(true)
                        }}
                      >
                        <TfiClose />
                      </button>
                    )
                  }
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
            className='text-modal'>{mainCommentBody}
          </p>
          <button
            className='text-modal-close-btn'
            onClick={closeCommentModal}>بستن
          </button>
        </DetailsModal>
      }

      {
        isShowDeleteModal &&
        <DeleteModal
          title={"آیا از حذف اطمینان دارید"}
          cancleAction={closeDeleteModal}
          submitAction={deleteComment}
        />
      }

      {
        isShowEditModal &&
        <EditModal
          onClose={closeEditModal}
          onSubmit={updateCommentBody}
        >
          <textarea value={mainCommentBody} onChange={(event) => setMainCommentBody(event.target.value)}>

          </textarea>
        </EditModal>
      }

      {
        isShowAcceptModal &&
        <DeleteModal
          title={"آیا از تایید اطمینان دارید"}
          cancleAction={closeAcceptModal}
          submitAction={acceptComment}
        />
      }
      {
        isShowRejectModal &&
        <DeleteModal
          title={"آیا از رد کردن اطمینان دارید"}
          cancleAction={closeRejectModal}
          submitAction={rejectComment}
        />
      }
    </div>
  )
}


export default Comments