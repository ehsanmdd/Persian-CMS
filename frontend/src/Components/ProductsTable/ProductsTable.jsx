import React, { useState, useEffect } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';

import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'
import ErrorBox from '../ErrorBox/ErrorBox';
import "./ProductsTable.css"

function ProductsTable() {


    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [productID, setProductID] = useState(null)
    const [mainProductInfo, setMainProductInfo] = useState({})


    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = () => {
        fetch("http://localhost:8000/api/products/")
            .then((res) => res.json())
            .then((productsItem) => setAllProducts(productsItem))
    }

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
        event.preventDefault()
        console.log("Submited")
        setIsShowEditModal(false)
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
                        {allProducts.map(product => (
                            <tr key={product.id} className="product__table__body">
                                <td className="product__table__header--info">
                                    <img src={product.img} alt="product img" className='product__table--img' />
                                </td>
                                <td className="product__table__header--info">{product.title}</td>
                                <td className="product__table__header--info">{product.price} میلیون تومان</td>
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
                                    <button className='product__table--btnEdit' onClick={() => setIsShowEditModal(true)}>ویرایش</button>
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
                            <BsCurrencyDollar />
                        </span>
                        <input className="product__table__form__group__input" type="text" placeholder='عنوان جدید را وارد کنید' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <BsCurrencyDollar />
                        </span>
                        <input className="product__table__form__group__input" type="text" placeholder='' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <BsCurrencyDollar />
                        </span>
                        <input className="product__table__form__group__input" type="text" placeholder='' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <BsCurrencyDollar />
                        </span>
                        <input className="product__table__form__group__input" type="text" placeholder='' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <BsCurrencyDollar />
                        </span>
                        <input className="product__table__form__group__input" type="text" placeholder='' />
                    </div>

                    <div className="product__table__form__group">
                        <span className="product__table__form__group__icon">
                            <BsCurrencyDollar />
                        </span>
                        <input className="product__table__form__group__input" type="text" placeholder='' />
                    </div>

                </EditModal>}
        </>
    )
}

export default ProductsTable