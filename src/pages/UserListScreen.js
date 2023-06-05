import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import Paginate from '../components/Paginates/PaginateUser'
import { getListUsers, deleteUser } from '../actions/userActions'
const UserListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users, page, pages } = userList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete
  useEffect(() => {
    if (userInfo && userInfo.data.user.isAdmin) {
      dispatch(getListUsers(pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo, pageNumber])
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1> Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm '>
            <thead>
              <tr>
                <th>STT</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>
                      <b>{index + (pageNumber && pageNumber - 1) * 10}</b>
                    </td>
                    <td>
                      <b>{user.name}</b>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`}>
                        <b>{user.email}</b>
                      </a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/user/${user._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
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
              <LinkContainer className='my-3' to='/customersTrash'>
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

export default UserListScreen
