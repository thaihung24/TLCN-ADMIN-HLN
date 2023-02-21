import React, { useEffect, useState } from "react";

import {
  Modal,
  Button,
  Row,
  Col,
  Table,
  Form,
  Dropdown,
  Pagination,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loader from "../loader/Loader";
import Message from "../message/Message";
import ColorList from "./ColorList";
const OptionList = ({
  show,
  setClose,
  selectedList,
  setSelectedList,
  event,
  match,
}) => {
  // Selected products
  const dispatch = useDispatch();
  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productListReducer
  );
  const [pageNumber, setPageNumber] = useState(0);
  // Handle button click
  const selectedAllOptionButtonClick = (v) => {
    setSelectedList((prev) => [
      ...prev,
      {
        productId: v._id,
        options: v.productOptions,
      },
    ]);
  };
  const checkboxProductChange = (e, product) => {
    const arr = [product._id, ...selectedList];
    e.target.checked && setSelectedList([...new Set(arr)]);
    !e.target.checked && setSelectedList(arr.filter((v) => v !== product._id));
  };
  useEffect(() => {
    dispatch(listProducts("", pageNumber));
  }, [dispatch, pageNumber]);
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
              <th>SELECTED</th>
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
                              <ColorList
                                key={i}
                                setItems={setSelectedList}
                                option={option}
                              />
                            ))
                          : "Option empty"}
                        <Dropdown.Item
                          onClick={() => selectedAllOptionButtonClick(v)}
                        >
                          All
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      value={v._id}
                      onChange={(e) => checkboxProductChange(e, v)}
                      checked={selectedList?.some(
                        (selected) => selected === v._id
                      )}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {pages && (
          <Pagination>
            {[...Array(pages + 1).keys()].map((x, index) => (
              <Pagination.Item
                key={index}
                onClick={() => setPageNumber(x)}
                active={x == page}
              >
                {x + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Row>
          <Col md={2}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Col>
          <Col md={4}>
            <Button
              onClick={() =>
                selectedList.length > 0 &&
                window.confirm("Clear all products?") &&
                setSelectedList([])
              }
              variant="primary"
            >
              Clear all
            </Button>
          </Col>
          {
            <Col md={6}>
              <Button
                disabled={
                  match.params.id !== "create"
                    ? JSON.stringify(selectedList) ===
                      JSON.stringify(event.products)
                    : selectedList.length < 1
                }
                onClick={() => {
                  if (window.confirm("Clear selected products?")) {
                    match.params.id !== "create" &&
                      setSelectedList(event.products);
                    match.params.id === "create" && setSelectedList([]);
                  }
                }}
                variant="primary"
              >
                Reset to previous
              </Button>
            </Col>
          }
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default OptionList;
