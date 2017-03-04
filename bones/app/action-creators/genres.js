import {RECEIVE_GENRES, RECEIVE_GENRE_ID} from '../constants'
import axios from 'axios'

export const receiveAllGenres = genres => ({
  type: RECEIVE_GENRES,
  genres
})

export const receiveGenreID = genreId => ({
  type: RECEIVE_GENRE_ID,
  genreId
})


export const genre = (genreId) => {
  return dispatch => {
    axios.get(`/api/genres/${genreId}`)
    .then(response => {
      dispatch(receiveGenreID(response.data.id))
    })
  }
}

