import React, { useEffect, useMemo, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader/Loader";
import Message from "../components/message/Message";
import { getEvent, updateEvent } from "../actions/eventAction";
import { Col, Form, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
const EventScreen = ({ match }) => {
  const dispatch = useDispatch();
  const fileElement = useRef(null);
  const { loading, success, error, event } = useSelector(
    (state) => state.eventDetail
  );
  // banner url
  const [bannerUrl, setBannerUrl] = useState("");
  useMemo(() => {
    const eventId = match.params.id;
    if (!event && eventId) {
      dispatch(getEvent(eventId));
    }
  }, [match.params.id]);
  useEffect(() => {
    setBannerUrl(event?.banner?.url);
  }, [event]);
  // Handler
  const bannerChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log(fileElement);
    console.log(fileElement.target);
    reader.onloadend = function (event) {
      setBannerUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const submitUpdateEvent = () => {
    const formData = new FormData();

    formData.append("image", fileElement.current.files[0]);
    const data = new Object();
    data = {
      ...data,
      products: newProducts || data.product,
      name: newName || data.name, 
      addAvailableDays: addAvailableDays + event.expireIn || data.expireIn,
      color: newColor || data.color,
      award: newAward || data.award,
    };

    formData.append("data", JSON.stringify(data));
    dispatch(updateEvent(formData))
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Form onSubmit={submitUpdateEvent}>
      {/* BANNER */}
      <Row>
        <Col md={12}>
          <LazyLoadImage
            alt="loading"
            height="auto"
            width="100%"
            src={bannerUrl}
          />
        </Col>
      </Row>
      {/* INPUT IMAGE */}
      <Row>
        <input type="file" ref={fileElement} onChange={bannerChange} />
      </Row>
      {/* INFO */}
      <Row></Row>
    </Form>
  );
};

export default EventScreen;
