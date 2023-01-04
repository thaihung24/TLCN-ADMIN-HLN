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

const initState = {
    loading: false,
    success: false,
    error: false,
}
export const eventsGetReducer = (state = initState, action) => {
    switch (action.type) {
        case EVENTS_GET_RESET:
            {
                return initState
            }
        case EVENTS_GET_REQUEST:
            return {
                loading: true,
            }
        case EVENTS_GET_SUCCESS:
            return {
                loading: false,
                success: true,
                events: action.payload,
            }
        case EVENTS_GET_FAIL:
            return {
                loading: false,
                error: action.payload,
                events: [],
            }
        default:
            return state
    }
}
export const eventCreateReducer = (state = initState, action) => {
    switch (action.type) {
        case EVENT_CREATE_RESET:
            {
                return initState
            }
        case EVENT_CREATE_REQUEST:
            return {
                loading: true,
            }
        case EVENT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                event: action.payload,
            }
        case EVENT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const eventGetReducer = (state = initState, action) => {
    switch (action.type) {
        case EVENT_GET_RESET:
            {
                return initState
            }
        case EVENT_GET_REQUEST:
            return {
                loading: true,
            }
        case EVENT_GET_SUCCESS:
            return {
                loading: false,
                success: true,
                event: action.payload,
            }
        case EVENT_GET_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
export const eventUpdateReducer = (state = initState, action) => {
    switch (action.type) {
        case EVENT_UPDATE_RESET:
            {
                return initState
            }
        case EVENT_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case EVENT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                event: action.payload,
            }
        case EVENT_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
export const eventDeleteReducer = (state = initState, action) => {
    switch (action.type) {
        case EVENT_DELETE_RESET:
            {
                return initState
            }
        case EVENT_DELETE_REQUEST:
            return {
                loading: true,
            }
        case EVENT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case EVENT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}