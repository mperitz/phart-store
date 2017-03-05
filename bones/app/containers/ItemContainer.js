import Item from '../components/Item'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    selected: state.items.selected,
    comments: state.items.comments
  }
}

const ItemContainer = connect(mapStateToProps, null)(Item)

export default ItemContainer
