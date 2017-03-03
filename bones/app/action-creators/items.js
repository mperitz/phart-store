import {RECEIVE_ITEMS, RECEIVE_ITEM, RECEIVE_GENRES} from '../constants'
import axios from 'axios';

export const receiveItems = items => ({
    type: RECEIVE_ITEMS,
    items
})

export const receiveItem = item => ({
    type: RECEIVE_ITEM,
    item
})

export const receiveAllGenres = genres => ({
  type: RECEIVE_GENRES,
  genres
})

export const items = () => {
  return dispatch => {
    axios.get(`/api/items`)
      .then(response => {
        dispatch(receiveItems(response.data))
      })
  }
}

export const item = (Itemid) => {
  return dispatch => {
    axios.get(`/api/items/${Itemid}`)
    .then(response => {
      dispatch(receiveItem(response.data))
    })
  }
}


