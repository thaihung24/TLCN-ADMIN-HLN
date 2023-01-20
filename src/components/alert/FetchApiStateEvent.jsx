import React from "react";
import Loader from "../loader/Loader";
import BombMessage from "../message/BombMessage";
import { useSelector, useDispatch } from "react-redux";
const FetchApiState = ({ history }) => {
  const dispatch = useDispatch();
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
  const loadingState =
    loading ||
    loadingDetail ||
    loadingCreate ||
    loadingDelete ||
    loadingUpdate ||
    loadingClear;
  const errorState =
    error ||
    errorDetail ||
    errorCreate ||
    errorDelete ||
    errorUpdate ||
    errorClear;
  const successState =
    successCreate || successDelete || successUpdate || successClear;
  const messageState =
    messageCreate || messageDelete || messageUpdate || messageClear;

  // navigate to list page
  return loadingState ? (
    <Loader />
  ) : errorState ? (
    <BombMessage variant="danger">{errorState}</BombMessage>
  ) : successState ? (
    <BombMessage variant="success">{messageState}</BombMessage>
  ) : (
    <></>
  );
};

export default FetchApiState;
