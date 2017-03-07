import React from 'react';
import ItemsList from './ItemsList'


export default function Profile (props) {
	// const testingProps = props.orders[0].orderItems ? props.orders[0].orderItems : 'no order items yet'
	console.log('testing props', props.orders)

	return (
		<div>
			{props.orders && props.orders.map((el, index) => (

				<div key={el.id}>
					<h4 > Order # {index+1} </h4>
					<ItemsList items={el.orderItems.map(orderItem => {
						return orderItem.items[0]
					})} />
				</div>

			)

			)}
		</div>
	)
}
