import {RECEIVE_ITEMS, RECEIVE_ITEM} from '../constants'
import axios from 'axios';

export const receiveItems = items => ({
    type: RECEIVE_ITEMS,
    items
})

export const receiveItem = item => ({
    type: RECEIVE_ITEM,
    item
})

export const items = () => {
  return dispatch => {
    axios.get(`/api/items`)
      .then(response => {
        dispatch(receiveItems(response.data))
      })
  }
}


