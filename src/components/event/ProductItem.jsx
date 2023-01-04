import React from "react";
import { useState } from "react";
import { Col, Dropdown, Form, Modal, Row, Button } from "react-bootstrap";

const ProductItem = ({ option, setItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(option.colors[0]?._id);
  return (
    <>
      <Dropdown.Item onClick={() => setIsOpen(true)}>
        {option.productOptionName}
      </Dropdown.Item>
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Danh sách màu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {option.colors &&
              option.colors.map((color, i) => (
                <Col key={i} md={Math.ceil(12 / option.colors.length)}>
                  <img
                    style={{ maxWidth: "100px" }}
                    src={color.images[0].urlImage}
                  />
                  <p style={{ textAlign: "center" }}>{color.color}</p>
                  <Form.Check
                    type="radio"
                    checked={color._id === currentValue}
                    onChange={() => setCurrentValue(color._id)}
                    value={color._id}
                  ></Form.Check>
                </Col>
              ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setItems((prev) => {
                const tempArr = [...prev, currentValue].filter(
                  (v, i, arr) => arr.indexOf(v) === i
                );
                return tempArr;
              });
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductItem;
