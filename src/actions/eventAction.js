import {
    EVENT_CREATE_FAIL,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_REQUEST,
    EVENT_CREATE_RESET,

    EVENT_GET_FAIL,
    EVENT_GET_SUCCESS,
    EVENT_GET_REQUEST,
    EVENT_GET_RESET,

    EVENTS_GET_FAIL,
    EVENTS_GET_SUCCESS,
    EVENTS_GET_REQUEST,
    EVENTS_GET_RESET,

    EVENT_UPDATE_FAIL,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_RESET,

    EVENT_DELETE_FAIL,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_REQUEST,
    EVENT_DELETE_RESET,
} from "../constants/eventContants"

import {
    URL
} from "../apis/axios"
import axios from "axios"

export const getEvents = () => (dispatch, getState) => {
    dispatch({
        type: EVENTS_GET_REQUEST,
    })
    const {
        userLogin: {
            userInfo
        },
    } = getState()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.data.access_token}`,
        },
    }
    axios.get(`${URL}/events/admin/get`, config).then(res => {
        dispatch({
            type: EVENTS_GET_SUCCESS,
            payload: res.data.events
        })
    }).catch((error) => {
        dispatch({
            type: EVENTS_GET_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    })
}

export const createEvent = (event) => (dispatch, getState) => {
    dispatch({
        type: EVENT_CREATE_REQUEST
    })
    const {
        userLogin: {
            userInfo
        },
    } = getState()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.data.access_token}`,
        },
    }
    axios.post(`${URL}/events`, event, config).then(res => {
        if (res.data.success) dispatch({
            type: EVENT_CREATE_SUCCESS,
            payload: res.data
        })
    }).catch(error => {
        dispatch({
            type: EVENT_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    })
}

export const getEvent = (id) => (dispatch, getState) => {
    dispatch({
        type: EVENT_GET_REQUEST,
    })
    const {
        userLogin: {
            userInfo
        },
    } = getState()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.data.access_token}`,
        },
    }
    axios.get(`${URL}/events/${id}`, config).then(res => {
        dispatch({
            type: EVENT_GET_SUCCESS,
            payload: res.data.event
        })
    }).catch((error) => {
        dispatch({
            type: EVENT_GET_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    })
}

export const updateEvent = (id, event) => (dispatch, getState) => {
    console.log(event)
    dispatch({
        type: EVENT_UPDATE_REQUEST,
    })
    const {
        userLogin: {
            userInfo
        },
    } = getState()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.data.access_token}`,
        },
    }
    axios.put(`${URL}/events/${id}`, event, config).then(res => {
        dispatch({
            type: EVENT_UPDATE_SUCCESS,
            payload: res.data
        })
    }).catch((error) => {
        dispatch({
            type: EVENT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    })
}
export const deleteEvent = (
    eventId
) => (dispatch, getState) => {
    dispatch({
        type: EVENT_DELETE_REQUEST
    })
    const {
        userLogin: {
            userInfo
        }
    } = getState()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.data.access_token}`,
        },
    }
    axios.delete(`${URL}/events/${eventId}`, config).then(res => {
        dispatch({
            type: EVENT_DELETE_SUCCESS,
            payload: res.data
        })
    }).catch((error) => {
        dispatch({
            type: EVENT_DELETE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    })
}
export const resetEventState = () => (dispatch, getState) => {
    dispatch({
        type: EVENT_CREATE_RESET,
    })
    dispatch({
        type: EVENT_UPDATE_RESET,
    })
    dispatch({
        type: EVENT_DELETE_RESET,
    })
}