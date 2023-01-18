import React, { useState } from 'react'
import DeleteModal from '../DeleteModal/DeleteModal'
import "./ProductsTable.css"
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'

function ProductsTable() {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)

    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)

    const [isShowEditModal, setIsShowEditModal] = useState(false)


    const modalSubmitAction = () => {
        setIsShowDeleteModal(false)
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
                    <tr className="product__table__body">
                        <td className="product__table__header--info">
                            <img src="./images/Product/galaxy-s22-ultra-phantom-black.png" alt="product img" className='product__table--img' />
                        </td>
                        <td className="product__table__header--info">Galaxy S22 Ultra Phantom Black</td>
                        <td className="product__table__header--info">25.000.000 میلیون تومان</td>
                        <td className="product__table__header--info">80</td>
                        <td className="product__table__header--info">
                            <button className='product__table--btnInfo' onClick={() => setIsShowDetailsModal(true)}>جزئیات</button>
                            <button className='product__table--btnDelete' onClick={() => setIsShowDeleteModal(true)}>حذف</button>
                            <button className='product__table--btnEdit' onClick={() => setIsShowEditModal(true)}>ویرایش</button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
                    onHide={closeDetailModal}
                />
            }
            {
                isShowEditModal &&
                <EditModal
                    onClose={() => setIsShowEditModal(false)}
                    onSubmit={updateProductInfo}>
                </EditModal>}
        </>
    )
}

export default ProductsTable