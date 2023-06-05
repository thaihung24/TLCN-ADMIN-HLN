import React, { useEffect } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import Paginate from '../components/Paginates/PaginateProduct'
import Rating from '../components/Rating'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productListReducer = useSelector((state) => state.productListReducer)
  const { loading, error, products, page, pages } = productListReducer

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.data.user.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }
  const formatVNDC = (price) => {
    return Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col className='col-8'>
          <h1>Products</h1>
        </Col>
        <Col className='text-right col-4 '>
          <LinkContainer to='/addproduct' className='my-3'>
            <Button className='rounded' variant='cyan'>
              <i className='fas fa-plus'></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>STT</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>RATING</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td className='text'>
                    {index + (pageNumber && pageNumber - 1) * 10}
                  </td>
                  <td className='text'>{product.name}</td>
                  <td className='text'>{formatVNDC(product.price)}</td>
                  <td className='text'>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} review`}
                      color="'#f8e825'"
                    />
                  </td>
                  <td className='text'>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
          <Row className='align-items-center'>
            <Col className='text-left'>
              <LinkContainer className='my-3' to='/productsTrash'>
                <Button>
                  <i className='fas fa-trash'></i> Thùng Rác
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductListScreen
