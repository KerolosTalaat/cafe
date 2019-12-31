import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Navbar from './Navbar';
import { fullOrder } from '../../action/orders';

const BaristaPage = ({ orders, firestore, auth, fullOrder, tables, savedOrder, history }) => {
	const [ newOrder, setOrder] = useState({order: [], tableNum: ''});
	var order;
	var name = auth.firstName + ' ' + auth.lastName;
	if ( typeof orders[0] === 'undefined' ){
	} else {
		order = orders.map((order, index) => {
			const refuseOrder = (e) =>  {
				e.preventDefault();
				firestore.collection('BaristaOrders').doc(order.id).update({orderState: 'refused', baristaName: name });
			}
			const acceptOrder = (e) =>  {
				e.preventDefault();
				e.target.classList.add("d-none");
				e.target.nextElementSibling.classList.add("d-none");
				e.target.nextElementSibling.nextElementSibling.classList.remove("d-none");
				setOrder({...newOrder, order: order.order, tableNum: order.tableNum});
			}
			const finishOrder = (e) =>  {
				e.preventDefault();
				firestore.collection('BaristaOrders').doc(order.id).update({orderState: 'finished', baristaName: name });
				firestore.collection('BaristaOrders').doc(order.id).delete();
				e.target.classList.add("d-none");
				e.target.previousElementSibling.classList.remove("d-none");
				e.target.previousElementSibling.previousElementSibling.classList.remove("d-none");
			}

			return (
				<div key={index} className="col-md-6 col-lg-4 b-order">
					<div className="responsive-table">
						<table className="table">
							<tbody>
						{order.order.map((orderList, index) => {
							return (
								<tr key={index}>
									<td>{orderList.quantity}x</td>
									<td>{orderList.name}</td>
									<td>{orderList.size}</td>
								</tr>
							)
						})}
							</tbody>
						</table>
					<p className="notes">{order.note}</p>
					</div>
					<div className="btn-container">
						<button className="btn btn-success mr-1 py-1 px-4" onClick={ acceptOrder }>Accept</button>
						<button className="btn btn-danger ml-1 py-1 px-4" onClick={ refuseOrder }>Refuse</button>
						<button className="btn btn-primary ml-1 py-1 px-5 d-none" onClick={ finishOrder }>finish</button>
					</div>
				</div>
			)
		})
	}
	
	
	const isInitialMount = useRef(true);
	useEffect(() => {
		  if (isInitialMount.current) {
			  isInitialMount.current = false;
		  } else{
				var savedId = tables[newOrder.tableNum-1].id;
			  console.log(newOrder)
				if( savedId !== '' ){
					var tableOrder = savedOrder.filter((order) => order.id === savedId)[0].order;
					var addOrder = tableOrder.concat(newOrder.order);
					firestore.collection('orders').doc(savedId).update({order: addOrder});
				}
				else{
					fullOrder(newOrder, newOrder.tableNum);
				}
					history.push('/baristaOrders');
			}
	}, [newOrder]);
	
	
	return (
		<React.Fragment>
			<Navbar />
			<div className="container-fluid">
				<div className='row'>
					{ order }
				</div>
			</div>
		</React.Fragment>
	)
}



const mapStateToProps = (state) => {
	const orders = state.firestore.ordered.BaristaOrders;
	const order = orders ? orders : [];
	const savedOrders = state.firestore.ordered.orders;
	const savedOrder = savedOrders ? savedOrders : [];
	const tables = state.firestore.ordered.tables;
	const table = tables ? tables : [];
	return {
		orders: order,
		tables: table,
		savedOrder: savedOrder,
		firestore: state.firestore,
		auth: state.firebase.profile
	}
} 

export default compose(
	connect(mapStateToProps, { fullOrder }),
	firestoreConnect([{ collection : 'BaristaOrders', orderBy: ["createdAt", "desc"]},{ collection : 'orders'},{ collection : 'tables'}])
)(BaristaPage);