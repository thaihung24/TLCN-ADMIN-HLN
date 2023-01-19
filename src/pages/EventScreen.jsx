import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createEvent,
  deleteEvent,
  getEvent,
  resetEventState,
  updateEvent,
} from "../actions/eventAction";
import {
  Button,
  Col,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LinkContainer } from "react-router-bootstrap";
import ProductButtonShow from "../components/event/ProductButtonShow";
import FetchApiState from "../components/alert/FetchApiStateEvent";
//
const EventScreen = (props) => {
  const { match, history } = props;
  const dispatch = useDispatch();
  //

  // selected List
  const [selectedList, setSelectedList] = useState([]);
  // event
  const [eventData, setEventData] = useState({
    products: [],
    name: "",
    expireIn: "",
    color: "",
    award: "",
  });
  // POST OR PUT CHECK
  const [editButton, setEditButton] = useState("PUT");
  // Select time type
  const [dateType, setDateType] = useState("date");
  const [dateAdd, setDateAdd] = useState(0);
  // File Element
  const fileElement = useRef(null);
  // Reset Expire time
  const [originExp, setOriginExp] = useState("");
  // GET API STATE
  const { event } = useSelector((state) => state.eventDetail);
  const { success: successCreate } = useSelector((state) => state.createEvent);
  const { success: successDelete } = useSelector((state) => state.eventDelete);
  const { success: successUpdate } = useSelector((state) => state.eventUpdate);
  // banner url
  const [bannerUrl, setBannerUrl] = useState("");
  // Initial event data state
  useMemo(() => {
    dispatch(resetEventState())
    const eventId = match.params.id;
    // without data dispatch to get one
    if (eventId !== "create" && eventId) {
      setEditButton("PUT");
      dispatch(getEvent(eventId));
    } else if (eventId === "create") {
      // Create page just initial state
      setEditButton("POST");
      setOriginExp("");
      setEventData({
        products: [],
        name: "",
        expireIn: "",
        color: "#000000",
        award: "",
      });
    }
  }, [match.params.id, dispatch]);
  // After received event data
  useEffect(() => {
    if (event && match.params.id !== "create") {
      setBannerUrl(event?.banner?.url);

      setOriginExp(new Date(event?.expireIn));

      setEventData({
        products: event?.products,
        name: event?.name,
        expireIn: new Date(event?.expireIn),
        color: event?.color,
        award: event?.award,
      });
      setSelectedList(event?.products);
    }
  }, [match.params.id, event]);

  // Update available date after expire time change
  useEffect(() => {
    const days = Math.round(
      (new Date(eventData.expireIn).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    );
    eventData.expireIn ? setDateAdd(days) : setDateAdd(0);
  }, [eventData.expireIn]);

  // navigate to event list
  useEffect(() => {
    (successDelete || successCreate || successUpdate) &&
      history.push("/events");
  }, [successCreate, successDelete, successUpdate, history, dispatch]);

  // Handler
  // BANNER IMAGE CHANGE
  const bannerChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function (event) {
      setBannerUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  // DATE CHANGE
  const datePicked = (e) => {
    const value = e.target.value;
    const validDate = new Date(value).getTime() - Date.now();
    const updateDate = () => {
      const days = Math.round(validDate / (1000 * 60 * 60 * 24));
      setDateAdd(days);
      const origin = new Date(originExp || Date.now());
      setEventData({
        ...eventData,
        expireIn: new Date(`${value}${origin.toISOString().slice(10)}`),
      });
    };
    validDate <= 0 ? alert("Ngày không hợp lệ") : updateDate();
  };
  // availableDateChange
  const availableDateChange = (e) => {
    const msecs = e.target.value * 1000 * 60 * 60 * 24;
    setEventData({
      ...eventData,
      expireIn: new Date(msecs + Date.now()),
    });
    setDateAdd(e.target.value);
  };
  // SUBMIT CALL
  const submitButtonClickHandler = () => {
    if (
      !eventData.award ||
      !eventData.name ||
      !eventData.expireIn ||
      (selectedList.length < 1 && eventData.products < 1)
    )
      return alert("Invalid event input, Fill and try again.");

    const formData = new FormData();
    fileElement.current.files[0] &&
      formData.append("image", fileElement.current.files[0]);
    // catch add date
    let data = eventData;

    data = {
      ...data,
      availableDays: dateAdd,
      products: selectedList,
    };
    formData.append("data", JSON.stringify(data));
    editButton === "PUT"
      ? dispatch(updateEvent(match.params.id, formData))
      : dispatch(createEvent(formData));
  };
  return (
    <>
      <FetchApiState {...props} />
      {match.params.id !== "create" && !event ? (
        <></>
      ) : (
        <Form>
          {/* BANNER */}
          <Row>
            <Col
              md={12}
              style={{
                display: "flex",
                height: "8em",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <LazyLoadImage
                alt="loading"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                src={
                  bannerUrl ||
                  "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png"
                }
              />
            </Col>
          </Row>
          {/* INPUT IMAGE */}
          <Row>
            <input type="file" ref={fileElement} onChange={bannerChange} />
          </Row>
          {/* INFO */}
          <Row>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>Đang có {selectedList && selectedList.length} sản phẩm</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md={2}>
                    <FormGroup>
                      <label>Màu</label>
                      <input
                        style={{ height: "70px" }}
                        className="form-control"
                        placeholder="Nhập màu"
                        type="color"
                        value={eventData?.color && eventData?.color}
                        onChange={(e) => {
                          setEventData({ ...eventData, color: e.target.value });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <label>Tên</label>
                      <input
                        type="text"
                        placeholder="Nhập tên"
                        className="form-control"
                        value={eventData?.name}
                        onChange={(e) =>
                          setEventData({ ...eventData, name: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <label>Ưu đãi</label>
                      <textarea
                        type="text"
                        placeholder="Nhập ưu đãi"
                        className="form-control count d-inline"
                        style={{ minHeight: "10em" }}
                        value={eventData?.award}
                        onChange={(e) =>
                          setEventData({ ...eventData, award: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Col md={12}>
                        {dateType === "date" ? (
                          <FormGroup>
                            <label>
                              {editButton === "PUT"
                                ? "Ngày thay đổi"
                                : "Ngày hết hạn"}
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={
                                eventData?.expireIn &&
                                new Date(eventData?.expireIn)
                                  .toISOString()
                                  .slice(0, 10)
                              }
                              onChange={datePicked}
                            />
                          </FormGroup>
                        ) : (
                          <FormGroup>
                            <label>
                              {editButton === "PUT"
                                ? "Số ngày thay đổi"
                                : "Số ngày hết hạn"}
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              value={dateAdd}
                              onChange={(e) =>
                                e.target.value > 0
                                  ? availableDateChange(e)
                                  : alert("Ngày nhập không hợp lệ")
                              }
                            />
                          </FormGroup>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Button onClick={() => setDateType("days")}>
                          Nhập số ngày
                        </Button>
                        <Button onClick={() => setDateType("date")}>
                          Chọn ngày
                        </Button>
                        {editButton === "PUT" && (
                          <Button
                            disabled={
                              new Date(eventData?.expireIn).getTime() ===
                              new Date(originExp).getTime()
                            }
                            onClick={() =>
                              setEventData((prev) => ({
                                ...prev,
                                expireIn: originExp,
                              }))
                            }
                          >
                            RESET
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Row>
          {/* ADD PRODUCT */}

          {/* Button submit */}
          <Row className="justify-content-space-between">
            {/* Left col */}
            <Col md={2}>
              <Button
                variant="danger"
                onClick={() =>
                  window.confirm("Expired this event?") &&
                  dispatch(deleteEvent(match.params.id))
                }
              >
                Disable
              </Button>
            </Col>
            {/* Right col */}
            <Col
              style={{
                display: "flex",
                padding: 0,
                justifyContent: "flex-end",
              }}
              md={10}
            >
              <Col md={3}>
                <ProductButtonShow
                  {...props}
                  event={event}
                  setSelectedList={setSelectedList}
                  selectedList={selectedList}
                />
              </Col>
              <Col md={3}>
                <Button
                  onClick={submitButtonClickHandler}
                  className="btn rounded btn-primary"
                >
                  {editButton === "POST" ? "Xác nhận" : "Cập nhật"}
                </Button>
              </Col>
              <Col md={2}>
                <LinkContainer to="/events">
                  <Button className="btn rounded" variant="cyan">
                    Hủy
                  </Button>
                </LinkContainer>
              </Col>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default EventScreen;
