import React from 'react'
import "./AddNewProduct.css"

function AddNewProduct() {



    
  return (
    <div className="addProduct">
        <h1 className="addProduct__title">افزودن محصول جدید</h1>

        <form action="#" className="addProduct__form">
            <div className="addProdcut__form__wrapper">
                <div className="addProduct__form__group">
                    <input 
                    type="text" 
                    placeholder='اسم محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text" 
                    placeholder='قیمت محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text" 
                    placeholder='موجودی محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text" 
                    placeholder='آدرس عکس محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text" 
                    placeholder='میزان محبوبیت محصول را وارد نمایدد' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text" 
                    placeholder='میزان فروش محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text" 
                    placeholder='تعداد رنگ بندی محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
            </div>
            <button className='addProduct__form__group--btn'>ثبت محصول</button>
        </form>
    </div>
  )
}


export default AddNewProduct