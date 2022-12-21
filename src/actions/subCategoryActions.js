import axios from 'axios'
import {
  SUB_CATEGORY_LIST_FAIL,
  SUB_CATEGORY_LIST_REQUEST,
  SUB_CATEGORY_LIST_SUCCESS,
} from '../constants/subCategoryConstants'
import { URL } from '../apis/axios'
export const getSubByIdCategories = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: SUB_CATEGORY_LIST_REQUEST })
    const { data } = await axios.get(
      `${URL}/subcategories?categoryId=${categoryId}`
    )
    dispatch({
      type: SUB_CATEGORY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
