import {RECEIVE_ITEMS, RECEIVE_ITEM, RECEIVE_COMMENTS, ADD_COMMENT} from '../constants'
import axios from 'axios'

export const receiveItems = items => ({
    type: RECEIVE_ITEMS,
    items
})

export const receiveItem = item => ({
    type: RECEIVE_ITEM,
    item
})

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
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

export const fetchComments = (itemId) => {
  return dispatch => {
    axios.get(`/api/items/${itemId}/comments`)
    .then(response => {
      dispatch(receiveComments(response.data))
    })
  }
}

export const createComment = (inputObj) => {
  const itemId = inputObj.itemId
  return dispatch => {
    axios.post(`/api/items/${itemId}/comments`, inputObj)
    .then(response => {
      dispatch(addComment(response.data))
    })
  }
}



