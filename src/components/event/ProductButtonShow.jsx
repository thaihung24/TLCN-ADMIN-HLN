import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import OptionList from "./OptionList";

const ProductButtonShow = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
      style={{minWidth:"200px"}}
        className="btn rounded btn-primary"
        onClick={() => setIsOpen(true)}
      >
        Thêm sản phẩm
      </Button>
      {isOpen && (
        <OptionList {...props} show={isOpen} setClose={setIsOpen} />
      )}
    </>
  );
};

export default ProductButtonShow;
