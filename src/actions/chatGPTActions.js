import axios from 'axios'
import {
  CHAT_GPT_REQUEST,
  CHAT_GPT_SUCCESS,
  CHAT_GPT_FAIL,
} from '../constants/chatgptConstants.js'

export const callChatGPT = (chat) => async (dispatch) => {
  try {
    dispatch({
      type: CHAT_GPT_REQUEST,
    })
    // const response = await fetch('/api/products/compare', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     message: chat.map((message) => message.message).join(' \n '),
    //   }),
    // })
    // const data = await response.json()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      `/api/products/compare`,
      {
        message: chat,
      },
      config
    )
    dispatch({
      type: CHAT_GPT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHAT_GPT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
