import {
  CHAT_GPT_REQUEST,
  CHAT_GPT_SUCCESS,
  CHAT_GPT_FAIL,
  CLEAR_ERRORS,
} from '../constants/chatgptConstants.js'
export const chatgptReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAT_GPT_REQUEST:
      return { loading: true }
    case CHAT_GPT_SUCCESS:
      return { loading: false, messages: action.payload }
    case CHAT_GPT_FAIL:
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
