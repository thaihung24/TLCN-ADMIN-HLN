import {
  SUB_CATEGORY_LIST_FAIL,
  SUB_CATEGORY_LIST_REQUEST,
  SUB_CATEGORY_LIST_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/subCategoryConstants'

export const subCategoriesReducer = (state = { subCategories: [] }, action) => {
  switch (action.type) {
    case SUB_CATEGORY_LIST_REQUEST:
      return { loading: true, subCategories: [] }
    case SUB_CATEGORY_LIST_SUCCESS:
      return { loading: false, subCategories: action.payload }
    case SUB_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return { ...state, error: null }
    default:
      return state
  }
}
