import React, { useMemo, useState } from "react";
import { Alert, Row, Col } from "react-bootstrap";
import { resetEventState } from "../../actions/eventAction";
import { useDispatch } from "react-redux";
const CountDownMessage = ({ variant, children, setIsOpen, isOpen }) => {
  const dispatch = useDispatch();
  const [remained, setRemained] = useState(10);
  useMemo(() => {
    const countdown = setInterval(() => {
      setRemained((prev) => {
        return (prev -= 1);
      });
    }, 1000);
    setTimeout(() => {
      if (isOpen) {
        setIsOpen(false);
        dispatch(resetEventState());
      }
      clearInterval(countdown);
    }, 10000);
  }, []);

  return (
    <Row style={{ alignItems: "center" }}>
      <Col md={11}>
        <Alert
          variant={variant}
        >{`${children}. Hide message after ${remained}s`}</Alert>
      </Col>
      <Col
        md={1}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setIsOpen(false);
          resetEventState();
        }}
      >
        <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>X</p>
      </Col>
    </Row>
  );
};
const BombMessage = ({ variant, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    isOpen && (
      <CountDownMessage setIsOpen={setIsOpen} isOpen={isOpen} variant={variant}>
        {children}
      </CountDownMessage>
    )
  );
};
BombMessage.defaultProps = { variant: "info" };
export default BombMessage;
