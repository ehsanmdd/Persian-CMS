import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai"
import { SlBasket } from "react-icons/sl"
import { FiUsers } from "react-icons/fi"
import { HiOutlineClipboardList } from "react-icons/hi"
import { CgDollar } from "react-icons/cg"
import { BiCommentDetail } from "react-icons/bi"
import "./Sidebar.css"

function Sidebar() {
  return (
    <div className="sidebar">
        <h1 className="sibebar__title">به داشبورد خود خوش آمدید</h1>

        <ul className="sidebar__links">
            <li>
                <Link  to="/products">
                <AiOutlineHome className="sidebar__links--icon"/>
                    صفحه اصلی
                </Link>
            </li>
            <li className='active'>
                <Link to="/products">
                    <SlBasket className="sidebar__links--icon"/>
                    محصولات
                </Link>
            </li>
            <li>
                <Link to="/comments">
                    <BiCommentDetail className="sidebar__links--icon"/>
                    کامنت ها
                </Link>
            </li>
            <li>
                <Link to="/users">
                    <FiUsers className="sidebar__links--icon"/>
                    کاربران
                </Link>
            </li>
            <li>
                <Link to="/orders">
                <HiOutlineClipboardList className="sidebar__links--icon"/>
                    سفارشات
                </Link>
            </li>
            <li>
                <Link to="/discounts">
                    <CgDollar className="sidebar__links--icon"/>
                    تخفیف ها
                </Link>
            </li>
        </ul>
    </div>
  )
}


export default Sidebar