import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { removeMeal } from '../../action/LocalStore';
import { BaristaOrders, fullOrder } from '../../action/orders';

const MenuSidebar = ({ profile, orders, removeMeal, tableNum, BaristaOrders, fullOrder, firestore, auth, history, tables, savedOrder}) => {
	const [ newOrder, setOrder] = useState({order: [], tableNum: tableNum, note:'', state: 'true', payment: ''});
	const key = [];
	var singleOrderDiv = document.querySelector('.full-order .single-order');
	var order = orders.map((order, index) => {
		const increment = (e) =>{
			e.preventDefault();
			order.quantity += 1;
			const newPrice = order.price * order.quantity;
			e.target.parentElement.previousElementSibling.childNodes[0].innerHTML = order.quantity + 'x';
			e.target.parentElement.previousElementSibling.childNodes[3].innerHTML = newPrice + ' EGP';
		}
		const decrement = (e) =>{
			e.preventDefault();
			order.quantity -= 1;
			if ( order.quantity <= 0 ){
				removeMeal(order);
			} else {
				const newPrice = order.price * order.quantity;
				e.target.parentElement.previousElementSibling.childNodes[0].innerHTML = order.quantity + 'x';
				e.target.parentElement.previousElementSibling.childNodes[3].innerHTML = newPrice + ' EGP';
			}
		}
		const firstLetter = order.size.charAt(0);
		   	const keyName = `${order.name} ${order.size}`;
            if(key.includes(keyName)){
                orders = orders.filter((repeated) =>
                    !order[repeated.name] && (order[repeated.name] = true));
            }
            else {
                key.push(`${order.name} ${order.size}`);
			return(
				<div key={ `${order.name} ${order.size}` } className='single-order'>
					<div className="order-dtails">
						<span className="quantity">{order.quantity}x</span>
						<span className='name'>{order.name}</span>
						<span className='size'>{firstLetter}</span>
						<span className='price'>{order.price} EGP</span>
					</div>
					<div className='quantity-btn'>
						<i className="fas fa-plus-circle" onClick={ increment }></i>
						<i className="fas fa-minus-circle" onClick={ decrement }></i>
					</div>
				<hr className='divider' />
				</div>
			)
		}
		return '';
	})
	
	const PaymentRole = (e) => {
		setOrder({ ...newOrder, payment : e.target.value });
	}
	
	const comment = (e) => {
		setOrder({ ...newOrder, note : e.target.value });
	}
	
	const saveOrder = (e) => {
		e.preventDefault();
		setOrder({...newOrder, order: orders});
	}
	

	
	const isInitialMount = useRef(true);
	useEffect(() => {
		  if (isInitialMount.current) {
			  isInitialMount.current = false;
			} else {
				BaristaOrders(newOrder);
				const savedId = tables[tableNum-1].id;
				if( savedId !== '' ){
					const tableOrder = savedOrder.filter((order) => order.id === savedId)[0].order;
					const addOrder = tableOrder.concat(newOrder.order);
					firestore.collection('orders').doc(savedId).update({order: addOrder});
				}
				else{
					fullOrder(newOrder, tableNum);
				}
				firestore.collection('tables').doc(tableNum.toString()).update({state: false});
					if ( singleOrderDiv !== null ){
						var fullOrderDiv = document.querySelector('.full-order');
						fullOrderDiv.removeChild(singleOrderDiv);
					}
						history.push('/table');
				
			}
	}, [newOrder.order]);

	
	const cheacout = (e) => {
		e.preventDefault();
		firestore.collection('tables').doc(tableNum.toString()).update({ id:''}).then(() =>{
			history.push('/table');
		})
	}
	

	return(
		<div className='MenuSidebar'>
			<header>
				<h6>{profile.firstName} {profile.lastName}</h6>
			</header>
			<hr className="divider" />
			<div className='full-order'>
				{ order }
			</div>
			<div className="btn-container">
				<div className="input-group">
				  <textarea className="form-control" aria-label="With textarea" onChange={comment}></textarea>
				</div>
				<div className="payment">
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="cash" name="payment" className="custom-control-input" value="cash" onClick={PaymentRole}/>
						<label className="custom-control-label" htmlFor="cash">Cash</label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
					  <input type="radio" id="credit" name="payment" className="custom-control-input" value="credit" onClick={PaymentRole}/>
					  <label className="custom-control-label" htmlFor="credit">Credit</label>
					</div>
				</div>
				<button className='btn btn-primary py-1 px-4' onClick={saveOrder}>Order</button>
				<button className='btn btn-primary py-1 px-4' onClick={cheacout}>Cheackout</button>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	const tables = state.firestore.ordered.tables;
	const table = tables ? tables : [];
	const savedOrders = state.firestore.ordered.orders;
	const savedOrder = savedOrders ? savedOrders : [];
	return {
		tables: table,
		savedOrder: savedOrder,
		profile: state.firebase.profile,
		orders: state.order,
		tableNum : state.tableNum,
		firestore : state.firestore,
		auth : state.firebase.auth
	}
}


export default compose(
	connect(mapStateToProps, { removeMeal, BaristaOrders, fullOrder }),
	firestoreConnect([{ collection : 'tables'}, { collection : 'orders'}])
)(MenuSidebar);