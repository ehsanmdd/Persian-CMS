import React, { useState, useEffect } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdTitle } from 'react-icons/md';
import { MdInventory2 } from 'react-icons/md';
import { BsFileImage } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import { FaSortAmountUp } from 'react-icons/fa';
import { HiColorSwatch } from 'react-icons/hi';

import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'
import ErrorBox from '../ErrorBox/ErrorBox';
import "./ProductsTable.css"

function ProductsTable({ allProducts, getAllProducts }) {


    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [productID, setProductID] = useState(null)
    const [mainProductInfo, setMainProductInfo] = useState({})


    const [productTitle, setProductTitle] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productCount, setProductCount] = useState("")
    const [productImg, setProductImg] = useState("")
    const [productPopularity, setProductPopularity] = useState("")
    const [productAmount, setProductAmount] = useState("")
    const [productColors, setProductColors] = useState("")


    const modalSubmitAction = () => {
        console.log("Deleted");
        fetch(`http://localhost:8000/api/products/${productID}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((result) => {
                setIsShowDeleteModal(false)
                getAllProducts()
            })
    }

    const modalCancelAction = () => {
        setIsShowDeleteModal(false)
    }
    const closeDetailModal = () => {
        setIsShowDetailsModal(false)
    }


    const updateProductInfo = (event) => {
        event.preventDefault();

        const newPorductInfo = {
            title: productTitle,
            price: productPrice,
            count: productCount,
            img: productImg,
            popularity: productPopularity,
            sale: productAmount,
            colors: productColors,
        }

        fetch(`http://localhost:8000/api/products/${productID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPorductInfo)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                getAllProducts()
                setIsShowEditModal(false)
            })

        console.log("Submited")
    }



    return (
        <>
            {allProducts.length ? (
                <table className="products__table">
                    <thead>
                        <tr className="product__table__header">
                            <th className='product__table__header--title'>عکس</th>
                            <th className='product__table__header--title'>اسم محصول</th>
                            <th className='product__table__header--title'>قیمت</th>
                            <th className='product__table__header--title'>موجودی</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.reverse().map(product => (
                            <tr key={product.id} className="product__table__body">
                                <td className="product__table__header--info">
                                    <img src={product.img} alt="product img" className='product__table--img' />
                                </td>
                                <td className="product__table__header--info">{product.title}</td>
                                <td className="product__table__header--info">{product.price} تومان</td>
                                <td className="product__table__header--info">{product.count}</td>
                                <td className="product__table__header--info">
                                    <button className='product__table--btnInfo' onClick={() => {
                                        setIsShowDetailsModal(true)
                                        setMainProductInfo(product)
                                    }}>جزئیات</button>
                                    <button className='product__table--btnDelete' onClick={() => {

                                        setIsShowDeleteModal(true)
                                        setProductID(product.id)
                                    }}>حذف</button>
                                    <button className='product__table--btnEdit' onClick={() => {
                                        setIsShowEditModal(true)
                                        setProductID(product.id)
                                        setProductTitle(product.title)
                                        setProductPrice(product.price)
                                        setProductCount(product.count)
                                        setProductImg(product.img)
                                        setProductPopularity(product.popularity)
                                        setProductAmount(product.sale)
                                        setProductColors(product.colors)
                                    }}>ویرایش</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <ErrorBox message="هیچ محصولی یافت نشد" />
            )}

            {
                isShowDeleteModal &&
                <DeleteModal
                    title={"آیا از خذف اطمینان دارید"}
                    submitAction={modalSubmitAction}
                    cancleAction={modalCancelAction}
                />
            }
            {
                isShowDetailsModal &&
                <DetailsModal
                    onHide={closeDetailModal}>
                    <table className="details__modal__table">
                        <thead>
                            <tr>
                                <th>محبوبیت</th>
                                <th>فروش</th>
                                <th>رنگ بندی</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{mainProductInfo.popularity}</td>
                                <td>{mainProductInfo.sale}</td>
                                <td>{mainProductInfo.colors}</td>
                            </tr>
                        </tbody>
                    </table>
                </DetailsModal>
            }
            {
                isShowEditModal &&
                <EditModal
                    onClose={() => setIsShowEditModal(false)}
                    onSubmit={updateProductInfo}>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <MdTitle />
                        </span>
                        <input
                            className="product__table__form__group__input"
                            value={productTitle}
                            onChange={(event) => setProductTitle(event.target.value)}
                            type="text"
                            placeholder='عنوان جدید محصول را وارد کنید' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <BsCurrencyDollar />
                        </span>
                        <input
                            className="product__table__form__group__input"
                            value={productPrice}
                            onChange={(event) => setProductPrice(event.target.value)}
                            type="text"
                            placeholder='قیمت جدید محصول را وارد کنید' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <MdInventory2 />
                        </span>
                        <input
                            className="product__table__form__group__input"
                            value={productCount}
                            onChange={(event) => setProductCount(event.target.value)}
                            type="text"
                            placeholder='موجودی جدید محصول را وارد کنید' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <BsFileImage />
                        </span>
                        <input
                            className="product__table__form__group__input"
                            value={productImg}
                            onChange={(event) => setProductImg(event.target.value)}
                            type="text"
                            placeholder='آدرس کاور جدید محصول را وارد کنید' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <AiFillLike />
                        </span>
                        <input
                            className="product__table__form__group__input"
                            value={productPopularity}
                            onChange={(event) => setProductPopularity(event.target.value)}
                            type="text"
                            placeholder='میزان محبوبیت محصول را وارد کنید' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <FaSortAmountUp />
                        </span>
                        <input
                            className="product__table__form__group__input"
                            value={productAmount}
                            onChange={(event) => setProductAmount(event.target.value)}
                            type="text"
                            placeholder='میزان فروش محصول را وارد کنید' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <HiColorSwatch />
                        </span>
                        <input
                            className="product__table__form__group__input"
                            value={productColors}
                            onChange={(event) => setProductColors(event.target.value)}
                            type="text"
                            placeholder='تعداد رنگ بندی' />
                    </div>

                </EditModal>}
        </>
    )
}

export default ProductsTable