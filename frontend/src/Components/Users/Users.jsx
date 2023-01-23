import React, { useEffect, useState } from 'react'
import { FaUserMinus } from 'react-icons/fa';
import { FaUserEdit } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiTwotonePhone } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';

import ErrorBox from "../ErrorBox/ErrorBox"
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailsModal from '../DetailsModal/DetailsModal';
import EditModal from '../EditModal/EditModal';
import "./Users.css"

function Users() {
  const [userID, setUserID] = useState('')
  const [users, setUsers] = useState([])
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)

  const [editUserFirtsName, setEditUserFirtsName] = useState('')
  const [editUserLastName, setEditUserLastName] = useState('')
  const [editUserUsername, setEditUserUsername] = useState('')
  const [editUserPassword, setEditUserPassword] = useState('')
  const [editUserPhoneNumber, setEditUserPhoneNumber] = useState('')
  const [editUserEmail, setEditUserEmail] = useState('')
  const [editUserCity, setEditUserCity] = useState('')
  const [editUserAddress, setEditUserAddress] = useState('')
  const [editUserScore, setEditUserScore] = useState('')
  const [editUserBuy, setEditUserBuy] = useState('')



  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = () => {
    fetch("http://localhost:8000/api/users/")
      .then(res => res.json())
      .then(users => {
        console.log(users)
        setUsers(users)
      })
  }

  const closeDeleteUserMNodal = () => setIsShowDeleteModal(false)
  const closeEditUserModal = () => setIsShowEditModal(false)
  const closeDetailModal = () => setIsShowDetailModal(false)



  const deleteUser = () => {
    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        getAllUsers()
        setIsShowDeleteModal(false)
      })
  }

  const updateUserInfo = () => {
    fetch(`http://localhost:8000/api/users/${userID}`,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : 
    })
  }

  return (
    <div className='table__container'>
      <h1 className="table__title">لیست کاربران</h1>
      {users.length ? (
        <table className='table__content'>
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>یوزرنیم</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td> {user.firstname} {user.lastname} </td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      setUserID(user.id)
                      setIsShowDetailModal(true)
                    }}
                  ><FaUser /></button>

                  <button
                    onClick={() => {
                      setUserID(user.id)
                      setIsShowEditModal(true)
                    }}
                  ><FaUserEdit /></button>

                  <button className='table__content--delete'
                    onClick={() => {
                      setUserID(user.id)
                      setIsShowDeleteModal(true)
                    }}
                  ><FaUserMinus /></button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox message="هیچ کاربری یافت نشد" />
      )}

      {
        isShowDeleteModal &&
        <DeleteModal
          title={"از حذف کاربر اطمینان دارید"}
          cancleAction={closeDeleteUserMNodal}
          submitAction={deleteUser}
        />
      }

      {
        isShowDetailModal &&
        <DetailsModal
          onHide={closeDetailModal}
        >

        </DetailsModal>
      }
      {
        isShowEditModal &&
        <EditModal onClose={closeEditUserModal} onSubmit={updateUserInfo}>
          <div className="edit__info__input__container">
            <div className="edit__user__info__input__group">
              <span>
                <MdDriveFileRenameOutline />
              </span>
              <input type="text" className='edit__user__info__input' placeholder='مقدار جدید نام و نام خانوادگی را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <AiOutlineUser />
              </span>
              <input type="text" className='edit__user__info__input' placeholder='مقدار جدید نام کاربری را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <RiLockPasswordLine />
              </span>
              <input type="text" className='edit__user__info__input' placeholder='مقدار جدید رمز عبور را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <AiTwotonePhone />
              </span>
              <input type="text" className='edit__user__info__input' placeholder='مقدار جدید شماره تماس را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <MdOutlineAlternateEmail />
              </span>
              <input type="text" className='edit__user__info__input' placeholder='مقدار جدید ایمیل را وارد نمایید' />
            </div>
          </div>
        </EditModal>
      }
    </div>
  )
}


export default Users