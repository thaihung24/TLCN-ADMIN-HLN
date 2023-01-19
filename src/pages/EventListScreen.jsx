import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { getEvents, clearEvent } from "../actions/eventAction";
import { Link } from "react-router-dom";

import FetchApiState from "../components/alert/FetchApiStateEvent";
import EventsFilter from "../components/event/EventsFilter";

const EventListScreen = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.eventList);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.data.user.isAdmin) dispatch(getEvents());
    else history.push("/login");
  }, [dispatch, history, userInfo]);

  return (
    <>
      {/* Alert State */}
      <FetchApiState {...props} />
      {/* Filter */}

      <EventsFilter />
      {events && events.length > 0 && (
        <>
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
            <Col
              md={4}
              onClick={() =>
                window.confirm("Delete all expired event permanently") &&
                dispatch(clearEvent())
              }
            >
              <Button variant="danger">Clean expired</Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default EventListScreen;
