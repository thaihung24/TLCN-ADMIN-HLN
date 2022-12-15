import {
  OPTION_ADD_ITEM,
  OPTION_REMOVE_ITEM,
  OPTION_ADD_ITEM_RESET,
} from '../constants/optionsConstants'

export const optionReducer = (state = { optionItems: [] }, action) => {
  switch (action.type) {
    case OPTION_ADD_ITEM:
      return {
        optionItems: action.payload,
      }
    case OPTION_ADD_ITEM_RESET:
      return { optionItems: [] }
    default:
      return state
  }
}
