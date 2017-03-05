import {connect} from 'react-redux'
import Sidebar from '../components/Sidebar'
import {genre} from '../action-creators/genres'
import {band} from '../action-creators/bands'


const mapStateToProps = (state) => {
  return {
  	genres: state.genres.listAll,
    selectedGenre: state.genres.selectedList,
    bands: state.bands.listAll,
    selectedBand: state.bands.selectedList
  }
}

const mapDispatchToProps = (dispatch) => {

	return {
		addGenre (genreId) {
      dispatch(genre(genreId))
		},

    addBand (bandId) {
      dispatch(band(bandId))
    }
	}
}

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer
