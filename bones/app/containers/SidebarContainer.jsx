import {connect} from 'react-redux'
import Sidebar from '../components/Sidebar'
import {genre} from '../action-creators/genres'


const mapStateToProps = (state) => {
  return {
  	genres: state.genres.listAll,
    selctedGenre: state.genres.selectedList
  }
}

const mapDispatchToProps = (dispatch) => {

	return {
		addGenre (genreId) {
      dispatch(genre(genreId))
		}
	}
}

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer
