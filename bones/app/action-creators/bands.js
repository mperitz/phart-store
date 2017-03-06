import {RECEIVE_BANDS, RECEIVE_BAND_ID} from '../constants'
import axios from 'axios'

export const receiveAllBands = bands => ({
  type: RECEIVE_BANDS,
  bands
})

export const receiveBandID = bandId => ({
  type: RECEIVE_BAND_ID,
  bandId
})


export const band = (bandId) => {
  return dispatch => {
    axios.get(`/api/bands/${bandId}`)
    .then(response => {
      dispatch(receiveBandID(response.data.id))
    })
  }
}


