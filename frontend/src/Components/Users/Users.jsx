import React, { useEffect, useState } from 'react'
import { FaUserMinus } from 'react-icons/fa';
import { FaUserEdit } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiTwotonePhone } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { ImLocation } from 'react-icons/im';
import { SiGoogleanalytics } from 'react-icons/si';
import { BiPurchaseTagAlt } from 'react-icons/bi';

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

  const updateUserInformation = {
    firstname: editUserFirtsName,
    lastname: editUserLastName,
    username: editUserUsername,
    password: editUserPassword,
    phone: editUserPhoneNumber,
    email: editUserEmail,
    city: editUserCity,
    address: editUserAddress,
    score: editUserScore,
    buy: editUserBuy,
  }

  const updateUserInfo = (event) => {
    event.preventDefault()

    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateUserInformation)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        getAllUsers()
        setIsShowEditModal(false)
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
                      setEditUserFirtsName(user.firstname)
                      setEditUserLastName(user.lastname)
                      setEditUserUsername(user.username)
                      setEditUserPassword(user.password)
                      setEditUserPhoneNumber(user.phone)
                      setEditUserEmail(user.email)
                      setEditUserCity(user.city)
                      setEditUserAddress(user.address)
                      setEditUserScore(user.score)
                      setEditUserBuy(user.buy)
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
          <table>
            <thead>
              <tr>
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>مجموع خرید</th>
                <th></th>
              </tr>
            </thead>
            {users.map(userInfo => (
              <tbody className='details__modal__table'>
                <tr>
                  <td>{userInfo.city}</td>
                  <td>{userInfo.address}</td>
                  <td>{userInfo.score}</td>
                  <td>{userInfo.buy}</td>
                </tr>
              </tbody>
            ))}
          </table>
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
              <input
                type="text"
                value={editUserFirtsName}
                onChange={(event) => setEditUserFirtsName(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید نام را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <MdDriveFileRenameOutline />
              </span>
              <input
                type="text"
                value={editUserLastName}
                onChange={(event) => setEditUserLastName(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید نام خانوادگی را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <AiOutlineUser />
              </span>
              <input
                type="text"
                value={editUserUsername}
                onChange={(event) => setEditUserUsername(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید نام کاربری را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <RiLockPasswordLine />
              </span>
              <input
                type="text"
                value={editUserPassword}
                onChange={(event) => setEditUserPassword(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید رمز عبور را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <AiTwotonePhone />
              </span>
              <input
                type="text"
                value={editUserPhoneNumber}
                onChange={(event) => setEditUserPhoneNumber(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید شماره تماس را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <MdOutlineAlternateEmail />
              </span>
              <input
                type="text"
                value={editUserEmail}
                onChange={(event) => setEditUserEmail(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید ایمیل را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <ImLocation />
              </span>
              <input
                type="text"
                value={editUserCity}
                onChange={(event) => setEditUserCity(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید شهر را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <ImLocation />
              </span>
              <input
                type="text"
                value={editUserAddress}
                onChange={(event) => setEditUserAddress(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید آدرس را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <SiGoogleanalytics />
              </span>
              <input
                type="text"
                value={editUserScore}
                onChange={(event) => setEditUserScore(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید امتیاز را وارد نمایید' />
            </div>
            <div className="edit__user__info__input__group">
              <span>
                <BiPurchaseTagAlt />
              </span>
              <input
                type="text"
                value={editUserBuy}
                onChange={(event) => setEditUserBuy(event.target.value)}
                className='edit__user__info__input'
                placeholder='مقدار جدید خرید کاربر را وارد نمایید' />
            </div>
          </div>
        </EditModal>
      }
    </div>
  )
}


export default Users