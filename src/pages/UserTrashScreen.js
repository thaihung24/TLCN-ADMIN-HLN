import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import Paginate from '../components/Paginates/PaginateTrashUser'
import {
  getTrashListUsers,
  forceUser,
  restoreUser,
} from '../actions/userActions'
const UserTrashScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const userTrashList = useSelector((state) => state.userTrashList)
  const { loading, error, users, page, pages } = userTrashList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userRestore = useSelector((state) => state.userRestore)
  const { success: successRestore } = userRestore
  const userForce = useSelector((state) => state.userForce)
  const { success: successForce } = userForce
  useEffect(() => {
    if (userInfo && userInfo.data.user.isAdmin) {
      dispatch(getTrashListUsers(pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successRestore, successForce])
  const restoreHandler = (id) => {
    if (window.confirm('Are you sure you want to restore')) {
      dispatch(restoreUser(id))
    }
  }
  const forceHandler = (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(forceUser(id))
    }
  }
  // {
  //   users && users.users.map((user) => console.log(user))
  // }

  return (
    <>
      <Row className='align-items-center'>
        <Col className='text-left'>
          <LinkContainer className='my-3' to='/customers'>
            <Nav.Link>
              <Button>
                <i class='fa-solid fa-arrow-left'></i> Quay lại
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
                    <td>{index + (pageNumber && pageNumber - 1) * 10}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
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
                      <Button
                        variant='light'
                        className='btn-sm'
                        onClick={() => restoreHandler(user._id)}
                      >
                        <i class='fa-solid fa-rotate-left'></i>
                      </Button>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => forceHandler(user._id)}
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

export default UserTrashScreen
