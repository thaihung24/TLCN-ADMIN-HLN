import {
    EVENT_CREATE_FAIL,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_REQUEST,
    EVENT_GET_FAIL,
    EVENT_GET_SUCCESS,
    EVENT_GET_REQUEST,
    EVENTS_GET_FAIL,
    EVENTS_GET_SUCCESS,
    EVENTS_GET_REQUEST,
    EVENT_UPDATE_FAIL,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE_REQUEST,
} from "../constants/eventContants"

export const eventsGetReducer = (state = {}, action) => {
    switch (action.type) {
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
export const eventCreateReducer = (state = {}, action) => {
    switch (action.type) {
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

export const eventGetReducer = (state = {}, action) => {
    switch (action.type) {
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
export const eventUpdateReducer = (state = {}, action) => {
    switch (action.type) {
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