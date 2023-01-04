import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ProductsModal from "./ProductsModal";

const ProductButtonShow = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="btn rounded btn-primary"
        onClick={() => setIsOpen(true)}
      >
        Thêm sản phẩm
      </Button>
      {isOpen && (
        <ProductsModal {...props} show={isOpen} setClose={setIsOpen} />
      )}
    </>
  );
};

export default ProductButtonShow;
