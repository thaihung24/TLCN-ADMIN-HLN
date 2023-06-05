import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import Paginate from '../components/Paginates/PaginateTrashProduct'
import {
  trashListProducts,
  restoreProduct,
  forceProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'

const ProductTrashScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productTrashList = useSelector((state) => state.productTrashList)
  const { loading, error, products, page, pages } = productTrashList
  const productRestore = useSelector((state) => state.productRestore)
  const {
    loading: loadingRestore,
    error: errorRestore,
    success: successRestore,
  } = productRestore
  const {
    loading: loadingForce,
    error: errorForce,
    success: successForce,
  } = useSelector((state) => state.productForce)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.data.user.isAdmin) {
      dispatch(trashListProducts('', pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successRestore, pageNumber, successForce])

  const restoreHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(restoreProduct(id))
    }
  }
  const forceHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(forceProduct(id))
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
        <Col className='text-left'>
          <LinkContainer className='my-3' to='/products'>
            <Nav.Link>
              <Button>
                <i className='fa-solid fa-arrow-left'></i> Quay lại
              </Button>
            </Nav.Link>
          </LinkContainer>
        </Col>
      </Row>
      <Row className='align-items-center'>
        <Col className='col-8'>
          <i className='fas fa-trash'></i>Thùng rác
        </Col>
      </Row>
      {loadingForce && <Loader />}
      {errorForce && <Message variant='danger'>{errorForce}</Message>}
      {loadingRestore && <Loader />}
      {errorRestore && <Message variant='danger'>{errorRestore}</Message>}
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
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + (pageNumber && pageNumber - 1) * 10}</td>
                  <td>{product.name}</td>
                  <td>{formatVNDC(product.price)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => restoreHandler(product._id)}
                    >
                      <i className='fa-solid fa-rotate-left'></i>
                    </Button>

                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => forceHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductTrashScreen
