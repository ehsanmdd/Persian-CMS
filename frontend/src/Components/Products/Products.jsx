import React, {useState, useEffect} from 'react'
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import ProductsTable from '../ProductsTable/ProductsTable'
export default function Products() {

  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getAllProducts();
}, [])

const getAllProducts = () => {
    fetch("http://localhost:8000/api/products/")
        .then((res) => res.json())
        .then((productsItem) => setAllProducts(productsItem))
}

  return (
    <>
      <AddNewProduct allProducts={allProducts} getAllProducts={getAllProducts}/>
      <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts}/>
    </>
  )
}
