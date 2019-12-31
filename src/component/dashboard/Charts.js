import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';

const Charts = ({ auth, notifications }) =>{
	
	const [className, setClassName] = useState({sidebar: 'sidebar'})
	const handleClick = () => {
		className.sidebar === 'sidebar' ? (
		setClassName({...className, sidebar : 'sidebar isClosed' })
		):(
		setClassName({...className, sidebar : 'sidebar'}))
	};
	
	const notification = notifications.map((notification, index) => {
		console.log(notification);
		return (
			<div key={index}>
				<p>{notification.user} {notification.content}</p>
			</div>
		)
	})
	
	const page = auth.uid ? (
		<div className="wrapper">
			<Sidebar sidebar={className.sidebar}/>
			<div className="container-fluid">		
				<button className='nav-btn'onClick={handleClick}>
					<div className='btn-div'></div>
					<div className='btn-div'></div>
					<div className='btn-div'></div>
				</button>
				<div className='container' >
					<header>
						<h2 className="title">Barista</h2>
					</header>
					{ notification }
				</div>
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
	const notifications = state.firestore.ordered.notifications;
	const notification = notifications ? notifications : [];
	return {
		auth : state.firebase.auth,
		notifications : notification,
		firestore: state.firestore
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection : 'notifications', order:'dec'}])
)(Charts);