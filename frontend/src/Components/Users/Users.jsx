import React, { useEffect, useState } from 'react'
import { FaUserMinus } from 'react-icons/fa';
import { FaUserEdit } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';


import ErrorBox from "../ErrorBox/ErrorBox"

function Users() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/api/users/")
      .then(res => res.json())
      .then(users => {
        console.log(users)
        setUsers(users)
      })
  }, [])

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
                  <button><FaUser /></button>
                  <button><FaUserEdit /></button>
                  <button className='table__content--delete'><FaUserMinus /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox message="هیچ کاربری یافت نشد" />
      )}
    </div>
  )
}


export default Users