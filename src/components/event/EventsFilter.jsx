import React, { useState } from "react";
import { Row, Col, Form, Dropdown, Button } from "react-bootstrap";
import { getEvents } from "../../actions/eventAction";
import { useDispatch } from "react-redux";
const EventsFilter = () => {
  const dispatch = useDispatch();
  const [arrange, setArrange] = useState();
  const [type, setType] = useState("");
  //   Event listener
  const filterButtonClick = () => {
    dispatch(getEvents(type, arrange));
  };
  return (
    <Row>
      <Col md={1} style={{ marginRight: "1rem" }}>
        <Dropdown>
          <Dropdown.Toggle>Type</Dropdown.Toggle>
          <Dropdown.Menu>
            {["Products", "Expire"].map((v) => (
              <Dropdown.Item onClick={() => setType(v)}>{v}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col md={1} style={{ marginRight: "2.8rem" }}>
        <Col>
          <Dropdown>
            <Dropdown.Toggle>Arrange</Dropdown.Toggle>
            <Dropdown.Menu>
              {["Increase", "Decrease"].map((v) => (
                <Dropdown.Item onClick={() => setArrange(v)}>{v}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Col>
      <Col md={1}>
        <Button onClick={filterButtonClick}>
          <i class="bx bx-filter-alt"></i>
        </Button>
      </Col>
    </Row>
  );
};

export default EventsFilter;
