import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/message/Message";
import Loader from "../components/loader/Loader";
import { getEvents } from "../actions/eventAction";
import { Link } from "react-router-dom";
import BombMessage from "../components/message/BombMessage";

const EventListScreen = ({ history }) => {
  const dispatch = useDispatch();
  

  
  // GET ACTION STATE
  // Loading list
  const { loading, success, error, events } = useSelector(
    (state) => state.eventList
  );
  // Update event
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    message: messageUpdate,
  } = useSelector((state) => state.eventUpdate);
  // Create event
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    message: messageCreate,
  } = useSelector((state) => state.createEvent);
  // Delete event
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
    message: messageDelete,
  } = useSelector((state) => state.eventDelete);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // dispatch();
    if (userInfo && userInfo.data.user.isAdmin) {
      dispatch(getEvents());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* Alert success action */}
          <>
            {successUpdate && (
              <BombMessage variant="success">{messageUpdate}</BombMessage>
            )}
            {successCreate && (
              <BombMessage variant="success">{messageCreate}</BombMessage>
            )}
            {successDelete && (
              <BombMessage variant="success">{messageDelete}</BombMessage>
            )}
          </>
          {/* Filter */}
          <Row>
            <Col>
            </Col>
          </Row>
          {/* TABLE DATA INFO */}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>AWARD</th>
                <th>COLOR</th>
                <th>BANNER_IMG</th>
                <th>PRODUCTS</th>
                <th>EXPIRES</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {events &&
                events?.length > 0 &&
                events?.map((event) => (
                  <tr key={event._id}>
                    <td className="text">{event._id}</td>
                    <td className="text">{event.user && event.user.name}</td>
                    <td className="text">{event.award.substring(0, 10)}</td>
                    <td className="text">
                      <input type="color" disabled value={event.color} />
                    </td>
                    <td>
                      <Link
                        style={{ textDecoration: "underline" }}
                        to={{ pathname: event.banner.url.toString() }}
                        target="_blank"
                      >
                        Image
                      </Link>
                    </td>
                    <td>{event.products.length}</td>
                    <td>{event.expireIn.substring(0, 10)}</td>
                    <td>
                      {new Date(event.expireIn) - Date.now() > 0 ? (
                        `${Math.floor(
                          new Date(
                            new Date(event.expireIn) - Date.now()
                          ).getTime() /
                            (1000 * 60 * 60 * 24)
                        )}days`
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>

                    <td>
                      <LinkContainer to={`/event/${event._id}`}>
                        <Button variant="light" className="btn-sm">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          {/* FINISH BUTTON */}
          <Row className="justify-content-between flex-row-reverse">
            <Col md={2}>
              <LinkContainer to="/event/create">
                <Button className="btn rounded btn-primary">Tạo mới</Button>
              </LinkContainer>
            </Col>
            <Col md={4}>
              <Button variant="danger">Clean expired</Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default EventListScreen;
