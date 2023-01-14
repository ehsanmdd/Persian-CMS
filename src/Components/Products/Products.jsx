import React from 'react'
import ErrorBox from "../ErrorBox/ErrorBox"
import AddNewProduct from '../AddNewProduct/AddNewProduct'

export default function Products() {
  return (
    <>
      <AddNewProduct />
      <ErrorBox message="هیچ محصولی یافت نشد" />
    </>
  )
}
