import Items from '../components/ItemsList'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	let items = state.items.list
	let genres = state.genres.selectedList// not created, array of ganres

	let filteredItems = items.filter(el => {
		for (let i = 0; i < genres.length; i++) {
			if (el.genre_id === genres[i]) return true
		}
    return false
	})

   let filteredItemsList = !genres.length ? items : filteredItems

  return {
    items: filteredItemsList
  }
}

const ItemsListContainer = connect(mapStateToProps, null)(Items)

export default ItemsListContainer
