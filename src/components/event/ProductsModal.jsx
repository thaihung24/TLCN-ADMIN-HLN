import React, { useEffect, useState } from "react";

import {
  Modal,
  Button,
  Row,
  Col,
  Table,
  Form,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loader from "../loader/Loader";
import Message from "../message/Message";
import ProductItem from "./ProductItem";
const ProductsModal = ({ show, setClose, selectedList, setSelectedList }) => {
  // Selected products
  const dispatch = useDispatch();
  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productListReducer
  );
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const handleClose = () => setClose(false);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Modal fullscreen show={true} onHide={handleClose}>
      <Modal.Header>
        <Row
          style={{ width: "100%" }}
          className="justify-content-space-between"
        >
          <Col md={8}>
            <Modal.Title>Danh sách sản phẩm </Modal.Title>
          </Col>
          <Col md={4} style={{ textAlign: "right" }}>
            <Modal.Title>
              Có: {selectedList && selectedList.length} sản phẩm
            </Modal.Title>
          </Col>
        </Row>
      </Modal.Header>

      <Modal.Body>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>OPTION</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((v, i) => (
                <tr key={i}>
                  <td>{v._id}</td>
                  <td className="text">{v.name}</td>
                  <td className="text">
                    <Dropdown drop="end">
                      <Dropdown.Toggle>Select option</Dropdown.Toggle>
                      <Dropdown.Menu>
                        {v.productOptions
                          ? v.productOptions.map((option, i) => (
                              <ProductItem
                                key={i}
                                setItems={setSelectedList}
                                option={option}
                              />
                            ))
                          : "Option empty"}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          onClick={() =>
            selectedList.length > 0 &&
            window.confirm("Clear selected products?") &&
            setSelectedList([])
          }
          variant="primary"
        >
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductsModal;
