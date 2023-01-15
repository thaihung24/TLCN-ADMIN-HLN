import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { listOrders } from '../actions/orderActions'
import Paginate from '../components/Paginates/PaginateOrder'
import Badge from '../components/badge/Badge'
const OrderListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders, page, pages } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.data.user.isAdmin) {
      dispatch(listOrders(pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, pageNumber])
  const orderStatus = {
    Shipping: 'primary',
    Shipped: 'success',
    shipping: 'primary',
    shipped: 'success',
    pending: 'warning',
    Pending: 'warning',
    paid: 'success',
    refund: 'danger',
    cancel: 'danger',
    Paid: 'success',
    Refund: 'danger',
    Cancel: 'danger',
    Confirm: 'primary',
    confirm: 'primary',
  }
  const formatVNDC = (price) => {
    return Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className='text'>{order._id}</td>
                  <td className='text'>{order.user && order.user.name}</td>
                  <td className='text'>{order.createdAt.substring(0, 10)}</td>
                  <td className='text'>{formatVNDC(order.totalPrice)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Badge
                      type={orderStatus[order.status.statusNow]}
                      content={order.status.statusNow}
                    />
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
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

export default OrderListScreen
