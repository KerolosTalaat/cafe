import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import Table from '../layout/Table';

const Orders = ({ auth, history }) =>{
	const [className, setClassName] = useState({sidebar: 'sidebar'})
	const handleClick = () => {
		className.sidebar === 'sidebar' ? (
		setClassName({...className, sidebar : 'sidebar isClosed' })
		):(
		setClassName({...className, sidebar : 'sidebar'}))
	};

	const page = auth.uid ? (
		<div className="wrapper">
			<Sidebar sidebar={className.sidebar}/>
			<div className="container-fluid">		
				<button className='nav-btn'onClick={handleClick}>
					<div className='btn-div'></div>
					<div className='btn-div'></div>
					<div className='btn-div'></div>
				</button>
				<Table history={history}/>
			</div>
		</div>
	):(<Redirect to='/'/>)
	return (
		<React.Fragment>
			{page}
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		auth : state.firebase.auth,
		firestore: state.firestore
	}
}

export default connect(mapStateToProps)(Orders);