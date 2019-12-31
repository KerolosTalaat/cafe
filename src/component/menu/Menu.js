import React from 'react';
import { Link } from 'react-router-dom';
import MenuSidebar from './MenuSidebar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
 
const Menu = ({ tableNum, history }) => {
	const page = tableNum === null ? (
		<Redirect to='/table'/>	
	):(
		<div className='container-fluid row menu'>
			<div className="col-sm-4 col-lg-3">
				<MenuSidebar history={history}/>
			</div>
			<div className="col-sm-8 col-lg-9 row">
				<div className='col-md-4 col-sm-6 category'>
					<Link to='/menu/meals'>
						<div className='meals'></div>
						<p>Meals</p>
					</Link>
				</div>
				<div className='col-md-4 col-sm-6 category'>
					<Link to='/menu/pizza'>
						<div className='pizza'></div>
						<p>Pizza</p>
					</Link>
				</div>
				<div className='col-md-4 col-sm-6 category'>
					<Link to='/menu/sandwiches'>
						<div className='sandwich'></div>
						<p>Sandwiches</p>
					</Link>
				</div>
				<div className='col-md-4 col-sm-6 category'>
					<Link to='/menu/seafood'>
						<div className='seafood'></div>
						<p>Seafood</p>
					</Link>
				</div>	
				<div className='col-md-4 col-sm-6 category'>
					<Link to='/menu/dessert'>
						<div className='dessert'></div>
						<p>Dessert</p>
					</Link>
				</div>	
				<div className='col-md-4 col-sm-6 category'>
					<Link to='/menu/drinks'>
						<div className='drinks'></div>
						<p>Drinks</p>
					</Link>
				</div>
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
	return {
		tableNum : state.tableNum
	}
}

export default connect(mapStateToProps)(Menu);