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
        <div className='table__container'>
            {allProducts.length ? (
                <table className="table__content">
                    <thead>
                        <tr>
                            <th>عکس</th>
                            <th>اسم محصول</th>
                            <th>قیمت</th>
                            <th>موجودی</th>
                        </tr>
                    </thead>
                    <tbody>
                        { allProducts.map(product => (
                            <tr key={product.id} >
                                <td>
                                    <img src={product.img} alt="product img" className='product__table--img' />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.price} تومان</td>
                                <td>{product.count}</td>
                                <td>
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
                    <div className='edit__info__input__container'>
                        <div className="edit__user__info__input__group">
                            <span>
                                <MdTitle />
                            </span>
                            <input
                                className="edit__user__info__input"
                                value={productTitle}
                                onChange={(event) => setProductTitle(event.target.value)}
                                type="text"
                                placeholder='عنوان جدید محصول را وارد کنید' />
                        </div>

                        <div className="edit__user__info__input__group">
                            <span>
                                <BsCurrencyDollar />
                            </span>
                            <input
                                className="edit__user__info__input"
                                value={productPrice}
                                onChange={(event) => setProductPrice(event.target.value)}
                                type="text"
                                placeholder='قیمت جدید محصول را وارد کنید' />
                        </div>

                        <div className="edit__user__info__input__group">
                            <span>
                                <MdInventory2 />
                            </span>
                            <input
                                className="edit__user__info__input"
                                value={productCount}
                                onChange={(event) => setProductCount(event.target.value)}
                                type="text"
                                placeholder='موجودی جدید محصول را وارد کنید' />
                        </div>

                        <div className="edit__user__info__input__group">
                            <span>
                                <BsFileImage />
                            </span>
                            <input
                                className="edit__user__info__input"
                                value={productImg}
                                onChange={(event) => setProductImg(event.target.value)}
                                type="text"
                                placeholder='آدرس کاور جدید محصول را وارد کنید' />
                        </div>

                        <div className="edit__user__info__input__group">
                            <span>
                                <AiFillLike />
                            </span>
                            <input
                                className="edit__user__info__input"
                                value={productPopularity}
                                onChange={(event) => setProductPopularity(event.target.value)}
                                type="text"
                                placeholder='میزان محبوبیت محصول را وارد کنید' />
                        </div>

                        <div className="edit__user__info__input__group">
                            <span>
                                <FaSortAmountUp />
                            </span>
                            <input
                                className="edit__user__info__input"
                                value={productAmount}
                                onChange={(event) => setProductAmount(event.target.value)}
                                type="text"
                                placeholder='میزان فروش محصول را وارد کنید' />
                        </div>

                        <div className="edit__user__info__input__group">
                            <span>
                                <HiColorSwatch />
                            </span>
                            <input
                                className="edit__user__info__input"
                                value={productColors}
                                onChange={(event) => setProductColors(event.target.value)}
                                type="text"
                                placeholder='تعداد رنگ بندی' />
                        </div>
                    </div>
                </EditModal>}
        </div>
    )
}

export default ProductsTable