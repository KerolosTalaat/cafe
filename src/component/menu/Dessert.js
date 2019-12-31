import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Order } from '../../action/LocalStore';
import MenuSidebar from './MenuSidebar';
import { Redirect } from 'react-router-dom';

const Dessert = ({ menus, order , Order, tableNum }) => {
	
	const [orders, setOrders ] = useState({});
	
	const selectSize = (e) => {
		var name = e.target.parentElement.closest(".info").previousSibling.previousSibling.innerHTML;
		var size = e.target.innerHTML;
		var price = e.target.nextSibling.innerHTML;
		var quantity = 1;
		setOrders({...orders,quantity,name, size, price});
	}
	const selectPrice = (e) => {
		var name = e.target.parentElement.closest(".info").previousSibling.previousSibling.innerHTML;
		var price = e.target.innerHTML;
		var size = e.target.previousSibling.innerHTML;
		var quantity = 1;
		setOrders({...orders,quantity, name, size, price})
	}
	const isInitialMount = useRef(true);
	useEffect(() => {
		  if (isInitialMount.current) {
			  isInitialMount.current = false;
  			} else {
  				Order(orders);
			}
	}, [orders]);
	
	const menu = menus.filter((filteredMeal) =>
            filteredMeal.role.includes('dessert')
        ).map((meal, index) => {
		const sizes = meal.size.map((meal, index) => {
			return(
				<span key={index} className='size-price'>
					<span id={meal.size} onClick={selectSize}>{ meal.size }</span>
					<span id={meal.price} onClick={selectPrice}>{ meal.price }</span>
				</span>
			)
		})
		return(
			<div key={index} className='meal'>
				<h5>{meal.name}</h5>
				<p className="text-muted">{meal.content}</p>
				<div className='info'>
					{sizes}
				</div>
			</div>
		)
	});
	const page = tableNum === null ? (
		<Redirect to='/table' />	
	):(
		<div className='container-fluid row menu'>
			<div className="col-sm-4 col-lg-3 left-container">
				<MenuSidebar />
			</div>
			<div className="col-sm-8 col-lg-9 row right-container">
				{menu}
			</div>
		</div>
	)
	return (
		<React.Fragment>
			{page}
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	const menus = state.firestore.ordered.menu;
	const menu = menus ? menus : [];
	return {
		menus: menu,
		tableNum : state.tableNum
	}
} 
export default compose(
	connect(mapStateToProps, {Order}),
	firestoreConnect([{ collection : 'menu'}])
)(Dessert);