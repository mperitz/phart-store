import React from 'react';
import ItemsList from './ItemsList'


export default function Profile (props) {

	// console.log(props.orders)

	return (
		<div>
			{props.orders && props.orders.map(el => (

				<div key={el.order_id}>
					<h4 > Order # {el.order_id} </h4>
					<ItemsList items={el.items} />
				</div>

			)

			)}
		</div>
	)
}
