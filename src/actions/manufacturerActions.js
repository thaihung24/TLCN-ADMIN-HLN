import axios from 'axios'
import { baseURL } from '../apis/axios'
import {
  MANUFACTURER_LIST_REQUEST,
  MANUFACTURER_LIST_SUCCESS,
  MANUFACTURER_LIST_FAIL,
} from '../constants/manufacturerConstants'

export const getManufactures = () => async (dispatch) => {
  try {
    dispatch({
      type: MANUFACTURER_LIST_REQUEST,
    })
    const { data } = await axios.get(`${baseURL.api}/manufacturers`)
    dispatch({
      type: MANUFACTURER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MANUFACTURER_LIST_FAIL,
    })
  }
}
