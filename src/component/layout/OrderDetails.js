import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Navbar from './Navbar';

const OrderDetails = ({ order, firestore, auth }) => {

		const details = order.map((order, index) => {
			return (
				<tr key={index}>
					<td>{order.quantity}x</td>
					<td>{order.name}</td>
					<td>{order.size}</td>
				</tr>
			)
		})
	
	return (
		<React.Fragment>
			<Navbar />
			<div className='container mt-5'>
				<h1 className="text-center">Cafe</h1>
				<table className="table">
					<thead>	
						<tr>
							<td>Quantity</td>
							<td>Name</td>
							<td>Size</td>
						</tr>
					</thead>
					<tbody>
						{details}
					</tbody>
				</table>
			</div>
		</React.Fragment>
	)
}



const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const orders = state.firestore.ordered.orders;
	const order = orders ? orders[id].order : [];
	return {
		order: order,
		firestore: state.firestore,
		auth: state.firebase.profile
	}
} 

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection : 'orders', orderBy: ["createdAt", "desc"]}])
)(OrderDetails);