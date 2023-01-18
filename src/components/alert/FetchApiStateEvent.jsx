import React from "react";
import Loader from "../loader/Loader";
import BombMessage from "../message/BombMessage";
import { useSelector, useDispatch } from "react-redux";
const FetchApiState = ({ history }) => {
  // GET ACTION STATE
  // Loading list
  const { loading, error, message } = useSelector((state) => state.eventList);
  const {
    loading: loadingDetail,
    success: successDetail,
    error: errorDetail,
  } = useSelector((state) => state.eventDetail);
  // Update event
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    message: messageUpdate,
  } = useSelector((state) => state.eventUpdate);
  // Create event
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    message: messageCreate,
  } = useSelector((state) => state.createEvent);
  // Delete event
  // Soft delete
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
    message: messageDelete,
  } = useSelector((state) => state.eventDelete);
  // Hard delete
  const {
    loading: loadingClear,
    success: successClear,
    error: errorClear,
    message: messageClear,
  } = useSelector((state) => state.eventClear);
  // navigate to list page
  return loading ||
    loadingDetail ||
    loadingCreate ||
    loadingDelete ||
    loadingUpdate ||
    loadingClear ? (
    <Loader />
  ) : error ||
    errorDetail ||
    errorCreate ||
    errorDelete ||
    errorUpdate ||
    errorClear ? (
    <BombMessage variant="danger">
      {error ||
        errorDetail ||
        errorCreate ||
        errorDelete ||
        errorUpdate ||
        errorClear}
    </BombMessage>
  ) : successCreate || successDelete || successUpdate || successClear ? (
    <BombMessage variant="success">
      {message ||
        messageCreate ||
        messageDelete ||
        messageUpdate ||
        messageClear}
    </BombMessage>
  ) : (
    <></>
  );
};

export default FetchApiState;
