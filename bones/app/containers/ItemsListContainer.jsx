import Items from '../components/ItemsList'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    items: state.items.list
  }
}

const ItemsListContainer = connect(mapStateToProps, null)(Items)

export default ItemsListContainer
