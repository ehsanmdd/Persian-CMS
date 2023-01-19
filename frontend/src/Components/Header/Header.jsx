import React from 'react'
import { AiOutlineBell } from "react-icons/ai"
import { BsBrightnessHigh } from "react-icons/bs"
import "./Header.css"

function Header() {
    return (
        <div className="header">
            <div className="header__admin__profile">
                <img src="./images/Avatar/UserImage-1.jpg" alt="Admin Iamge" className='header__admin__profile--img' />
                <div>
                    <h1 className='header__admin__profile--username'>نرگس فاخته</h1>
                    <h3 className='header__admin__profile--jobtitel'>Front-End Developer</h3>
                </div>
            </div>
            <div className="header__left__section">
                <div className="header__left__searchBox">
                    <input className='header__left__searchBox--input' type="text" placeholder='جستجو کنید...' />
                    <button className='header__left__searchBox--btn'>جستجو</button>
                </div>

                <button className="header__left--btn">
                    <AiOutlineBell className='header__left--icon' />
                </button>
                <button className="header__left--btn">
                    <BsBrightnessHigh className='header__left--icon' />
                </button>
            </div>
        </div>
    )
}

export default Header