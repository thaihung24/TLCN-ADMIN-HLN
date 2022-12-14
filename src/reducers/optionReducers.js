import {
  OPTION_ADD_ITEM,
  OPTION_REMOVE_ITEM,
} from '../constants/optionsConstants'

export const optionReducer = (state = { optionItems: [] }, action) => {
  switch (action.type) {
    case OPTION_ADD_ITEM:
      const item = action.payload
      return {
        ...state,
        optionItems: [item],
      }
    default:
      return state
  }
}
