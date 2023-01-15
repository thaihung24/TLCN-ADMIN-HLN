import {
  MANUFACTURER_LIST_REQUEST,
  MANUFACTURER_LIST_SUCCESS,
  MANUFACTURER_LIST_FAIL,
  CLEAR_ERRORS,
} from '../constants/manufacturerConstants.js'

export const manufacturerListReducer = (
  state = { manufacturers: [] },
  action
) => {
  switch (action.type) {
    case MANUFACTURER_LIST_REQUEST:
      return { loading: true, manufacturers: [] }
    case MANUFACTURER_LIST_SUCCESS:
      return { loading: false, manufacturers: action.payload }
    case MANUFACTURER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
