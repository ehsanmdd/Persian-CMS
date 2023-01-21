import React, {useState, useEffect} from 'react'
import "./AddNewProduct.css"

function AddNewProduct({ getAllProducts }) {

    const [newProductTitle, setNewProductTitle] = useState("")
    const [newProductPrice, setNewProductPrice] = useState("")
    const [newProductCount, setNewProductCount] = useState("")
    const [newProductImg, setNewProductImg] = useState("")
    const [newProductPopularity, setNewProductPopularity] = useState("")
    const [newProductAmount, setNewProductAmount] = useState("")
    const [newProductColors, setNewProductColors] = useState("")


    const newProductObject = {
        title: newProductTitle,
        price: newProductPrice,
        count: newProductCount,
        img: newProductImg,
        popularity: newProductPopularity,
        sale: newProductAmount,
        colors: newProductColors,
    }

    const addNewProduct = (event) => {
        event.preventDefault();

        fetch(`http://localhost:8000/api/products`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newProductObject)
        })
            .then(res => res.json())
            .then(result => {
                getAllProducts()
                console.log(getAllProducts())
            })
    }

  return (
    <div className="addProduct">
        <h1 className="addProduct__title">افزودن محصول جدید</h1>

        <form action="#" className="addProduct__form">
            <div className="addProdcut__form__wrapper">
                <div className="addProduct__form__group">
                    <input 
                    type="text"
                    value={newProductTitle}
                    onChange={(event) => setNewProductTitle(event.target.value)} 
                    placeholder='اسم محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text"
                    value={newProductPrice}
                    onChange={(event) => setNewProductPrice(event.target.value)} 
                    placeholder='قیمت محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text"
                    value={newProductCount}
                    onChange={(event) => setNewProductCount(event.target.value)} 
                    placeholder='موجودی محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text"
                    value={newProductImg}
                    onChange={(event) => setNewProductImg(event.target.value)} 
                    placeholder='آدرس عکس محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text"
                    value={newProductPopularity}
                    onChange={(event) => setNewProductPopularity(event.target.value)} 
                    placeholder='میزان محبوبیت محصول را وارد نمایدد' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text"
                    value={newProductAmount}
                    onChange={(event) => setNewProductAmount(event.target.value)} 
                    placeholder='میزان فروش محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
                <div className="addProduct__form__group">
                    <input 
                    type="text"
                    value={newProductColors}
                    onChange={(event) => setNewProductColors(event.target.value)} 
                    placeholder='تعداد رنگ بندی محصول را وارد نمایید' 
                    className='addProduct__form__group__wrapper--input'/>
                </div>
            </div>
            <button 
            className='addProduct__form__group--btn'
            onClick={addNewProduct}>ثبت محصول</button>
        </form>
    </div>
  )
}


export default AddNewProduct