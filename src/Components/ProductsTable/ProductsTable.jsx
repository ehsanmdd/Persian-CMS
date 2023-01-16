import React, { useState } from 'react'
import DeleteModal from '../DeleteModal/DeleteModal'
import "./ProductsTable.css"

function ProductsTable() {

    const [isShowModal, setIsShowModal] = useState(false)

    const modalSubmitAction = () => {
        setIsShowModal(false)
    }
    const modalCancelAction = () => {
        setIsShowModal(false)
    }

    return (
        <>
            <div className="tabale__container">
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
                                <button className='product__table--btnEdit'>جزئیات</button>
                                <button className='product__table--btnDelete' onClick={() => setIsShowModal(!isShowModal)}>حذف</button>
                                <button className='product__table--btnInfo'>ویرایش</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {isShowModal && <DeleteModal submitAction={modalSubmitAction} cancleAction={modalCancelAction} />}
        </>
    )
}

export default ProductsTable