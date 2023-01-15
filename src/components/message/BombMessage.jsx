import React, { useMemo, useState } from "react";
import { Alert } from "react-bootstrap";
import { resetEventState } from "../../actions/eventAction";
import { useDispatch } from "react-redux";
const CountDownMessage = ({ variant, children }) => {
  const dispatch = useDispatch();
  const [remained, setRemained] = useState(10);
  useMemo(() => {
    const countdown = setInterval(() => {
      setRemained((prev) => {
        return (prev -= 1);
      });
    }, 1000);
    setTimeout(() => {
      dispatch(resetEventState());
      clearInterval(countdown);
    }, 10000);
  }, []);

  return (
    <Alert
      variant={variant}
    >{`${children}. Hide message after ${remained}s`}</Alert>
  );
};
const BombMessage = ({ variant, children }) => {
  return <CountDownMessage variant={variant}>{children}</CountDownMessage>;
};
BombMessage.defaultProps = { variant: "info" };
export default BombMessage;
