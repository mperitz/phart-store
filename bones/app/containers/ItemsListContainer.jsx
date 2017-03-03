import Items from '../components/ItemsList'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	// let items = state.items.list;
	// let genres = state.items.genres;// not created, array of ganres

	// let filteredItems = items.filter(el =>
	// {	return true
	// 	// if(!genres.length) return true
	// 	// for (let i = 0; i< genres.length; i++) {
	// 	// 	if(el.genre === genres[i]) return true
	// 	// }	
	// })
  return {
    items: state.items.list
  }
}

const ItemsListContainer = connect(mapStateToProps, null)(Items)

export default ItemsListContainer
