import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const Stock = ({ auth, firestore, stock, menu }) => {
	
	var total = 0;
	var state;
	
	
	const stockTable = stock.map((component, index) => {
		total = 0;
		const components = menu.filter((filteredMeal) =>
        	filteredMeal.stock.includes("chicken")).map((meal, index) => {
			meal.size.map((meal, index) => {
				total = total + meal.quantity * meal.stockQuantity;
				console.log(component.id)
			firestore.collection('menu').doc(component.id.toString()).update({ exist: 500})
		})	
			state = Math.floor((component.exist / component.max) * 100);
			if ( state <= 25 ){
				state = 'Bad';
			} else {
				state="Good";
			}
			return(
				<React.Fragment key={index}>
					<td>{state}</td>
				</React.Fragment>
			)
		})	
		return(
			<tr key={index}>
				<td>{component.name}</td>
				<td>{component.max}</td>
				<td>{component.min}</td>
				<td>{component.exist}</td>
				{components}
			</tr>
		)
	})
	
	
	return (
		<React.Fragment>
			<table className="table">
				<thead>
					<tr>
						<td>Name</td>
						<td>Max</td>
						<td>Min</td>
						<td>Exist</td>
						<td>state</td>
					</tr>
				</thead>
				<tbody>
					{ stockTable }
				</tbody>
			</table>
		</React.Fragment>
	)
}



const mapStateToProps = (state) => {
	const stockComponent = state.firestore.ordered.stock;
	const stock = stockComponent ? stockComponent : [];
	const menus = state.firestore.ordered.menu;
	const menu = menus ? menus : [];
	return {
		stock: stock,
		menu: menu,
		firestore: state.firestore,
		auth: state.firebase.profile
	}
} 

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection : 'stock'},{ collection : 'menu'}])
)(Stock);