import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import moment from 'moment';

const Notification = ({ auth, notifications, firestore }) =>{
	
	const [className, setClassName] = useState({sidebar: 'sidebar'})
	const handleClick = () => {
		className.sidebar === 'sidebar' ? (
		setClassName({...className, sidebar : 'sidebar isClosed' })
		):(
		setClassName({...className, sidebar : 'sidebar'}))
	};
	
	const notification = notifications.map((notification, index) => {
		const clearIt = (e) => {
			e.preventDefault();
			firestore.collection('notifications').doc(notification.id).delete();
		}
		return (
			notification.role === 'Userstate' ? (
				notification.online === 'online' ? (
					<p key={index}>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ clearIt }>
							<span aria-hidden="true">&times;</span>
						</button>
						<i className="fas fa-circle text-success"></i>
						<span>{notification.content} since {moment(notification.time.toDate()).fromNow()}</span>
					</p>
				) : (
					<p key={index}>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ clearIt }>
							<span aria-hidden="true">&times;</span>
						</button>
						<i className="fas fa-circle text-danger"></i>
						<span>{notification.content} since {moment(notification.time.toDate()).fromNow()}</span>
					</p>
				) 
			) : ( 
				notification.orderState === 'refused' ? (
					<p key={index}>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ clearIt }>
							<span aria-hidden="true">&times;</span>
						</button>
						<i className="far fa-calendar-times"></i>
						<span>{notification.content} since {moment(notification.time.toDate()).fromNow()}</span>
					</p>
				) : ''
			)
				
			
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
					<div className="notification">
						{ notification }
					</div>
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
	firestoreConnect([{ collection : 'notifications', orderBy: ["time", "desc"]}])
)(Notification);