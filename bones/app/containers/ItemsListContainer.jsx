import Items from '../components/ItemsList'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	let items = state.items.list
  let genres = state.genres.selectedList
	let bands = state.bands.selectedList

	let filteredGenreItems = items.filter(el => {
		for (let i = 0; i < genres.length; i++) {
			if (el.genre_id === genres[i]) return true
		}
    return false
	})

  let filteredGenreItemsList = !genres.length ? items : filteredGenreItems

  let filterCombinedBandGenreItems = filteredGenreItemsList.filter(el => {
    for (let i = 0; i < bands.length; i++) {
      if (el.band_id === bands[i]) return true
    }
    return false
  })


  let filteredItemsList = !bands.length ? filteredGenreItemsList : filterCombinedBandGenreItems

  return {
    items: filteredItemsList
  }
}

const ItemsListContainer = connect(mapStateToProps, null)(Items)

export default ItemsListContainer
