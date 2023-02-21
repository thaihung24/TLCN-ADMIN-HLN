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

    EVENT_CLEAR_REQUEST,
    EVENT_CLEAR_SUCCESS,
    EVENT_CLEAR_FAIL,
    EVENT_CLEAR_RESET,
} from "../constants/eventContants"

import {
    URL
} from "../apis/axios"
import axios from "axios"


// @@CREATE
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
    // @@READ
    // LIST
export const getEvents = (type = undefined, arrange = undefined) => (dispatch, getState) => {
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

            const events = res.data.events.sort((a, b) => {
                const date = (time) => new Date(time).getTime()
                if (arrange === "Increase") {
                    if (type === "Products") return a.products.length > b.products.length ? 1 : -1;
                    else return date(a.expireIn) > date(b.expireIn) ? 1 : -1;
                } else {
                    if (type === "Products") return a.products.length < b.products.length ? 1 : -1;
                    else return date(a.expireIn) < date(b.expireIn) ? 1 : -1;

                }
            })

            dispatch({
                type: EVENTS_GET_SUCCESS,
                payload: {
                    ...res.data,
                    events,
                }
            })
        }).catch((error) => {
            dispatch({
                type: EVENTS_GET_FAIL,
                payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message,
            })
        })
    }
    // BY ID
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
            payload: res.data
        })
    }).catch((error) => {
        dispatch({
            type: EVENT_GET_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    })
}

// @@UPDATE
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
    // @@DELETE
    // SOFT DELETE
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
export const clearEvent = () => (dispatch, getState) => {
    dispatch({
        type: EVENT_CLEAR_REQUEST,
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
    axios.delete(`${URL}/events/expiredEvents`, config).then(res => {
        dispatch({
            type: EVENT_CLEAR_SUCCESS,
            payload: res.data
        })
    }).catch((error) => {
        dispatch({
            type: EVENT_CLEAR_FAIL,
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
    dispatch({
        type: EVENT_CLEAR_RESET,
    })
    dispatch({
        type: EVENT_GET_RESET,
    })
    dispatch({
        type: EVENTS_GET_RESET,
    })
}