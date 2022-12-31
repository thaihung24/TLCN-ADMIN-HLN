import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/message/Message";
import Loader from "../components/loader/Loader";
import { getEvents } from "../actions/eventAction";
const EventListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { loading, success, error, events } = useSelector(
    (state) => state.eventList
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
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
              {events?.map((event) => (
                <tr key={event._id}>
                  <td className="text">{event._id}</td>
                  <td className="text">{event.user && event.user.name}</td>
                  <td className="text">{event.award.substring(0, 10)}</td>
                  <td className="text">
                    <input type="color" disabled value={event.color} />
                  </td>
                  <td>
                    <a href={event.banner.url} target="_blank">
                      Image
                    </a>
                  </td>
                  <td>{event.products.length}</td>
                  <td>{event.expireIn.substring(0, 10)}</td>
                  <td>
                    {new Date(event.expireIn) - Date.now() > 0 ? (
                      `${Math.floor(new Date(
                        new Date(event.expireIn) - Date.now()
                      ).getTime() /
                      (1000 * 60 * 60 * 24 ))}days`
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
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
        </>
      )}
    </>
  );
};

export default EventListScreen;
