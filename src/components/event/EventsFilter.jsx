import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Dropdown,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { getEvents } from "../../actions/eventAction";
import { useDispatch } from "react-redux";
const EventsFilter = () => {
  const dispatch = useDispatch();
  const [arrange, setArrange] = useState();
  const [type, setType] = useState("");
  return (
    <Row>
      <Col md={4}>
        <Row>
          <Col md={5}>
            <Dropdown>
              <Dropdown.Toggle>{type || "TYPE"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {["Products", "Expire"].map((v) => (
                  <Dropdown.Item onClick={() => setType(v)}>{v}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3}>
            <Dropdown>
              <Dropdown.Toggle>{arrange || "Arrange"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {["Increase", "Decrease"].map((v) => (
                  <Dropdown.Item onClick={() => setArrange(v)}>
                    {v}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Col>

      <Col md={1}>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Selected Type and Arrange First</Tooltip>}
        >
          <Button
            onClick={() =>
              type && arrange && dispatch(getEvents(type, arrange))
            }
          >
            <i class="bx bx-filter-alt"></i>
          </Button>
        </OverlayTrigger>
      </Col>
    </Row>
  );
};

export default EventsFilter;
