import {connect} from 'react-redux'
import Sidebar from '../components/Sidebar'

const mapStateToProps = (state, ownprops) => {
  return {
  	genres: state.items.genres
  }
}
//import actioncreatopr
const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		// updateStore: function(){

		// }
	}
}

const SidebarContainer = connect(mapStateToProps, null)(Sidebar)

export default SidebarContainer
