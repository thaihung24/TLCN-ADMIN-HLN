import { OPTION_ADD_ITEM } from '../constants/optionsConstants'

export const addToOption = (data) => async (dispatch, getState) => {
  dispatch({
    type: OPTION_ADD_ITEM,
    payload: data,
  })

  localStorage.setItem(
    'optionItems',
    JSON.stringify(getState().option.optionItems)
  )
}
