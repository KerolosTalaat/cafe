import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signOut } from '../../action/authAction';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';

const TablesSideBar = ({ profile, signOut, notifications, firestore, auth, history }) => {
	
	const goOut = (e) => {
		e.preventDefault();
		firestore.collection('users').doc(auth.uid).update({isOnline: 'offline'});
		signOut();
	}
	
	const notification = notifications.map((notification, index) => {
		const clearIt = (e) => {
			e.preventDefault();
			firestore.collection('notifications').doc(notification.id).delete();
		}
		const iconClass = notification.orderState === 'finished' ? ( "far fa-calendar-check" ) : ( "far fa-calendar-times" ) 
		const none = notification.online  ?  "d-none"  :  '';
		return (
			<p key={index} className={none}>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ clearIt }>
          			<span aria-hidden="true">&times;</span>
        		</button>
				<i className={iconClass}></i>
				<span>{notification.content} since {moment(notification.time.toDate()).fromNow()}</span>
			</p>
			)
	})
	
	
	return(
		<div className='MenuSidebar'>
			<header>
				<h6>{profile.firstName} {profile.lastName}</h6>
			</header>
			<hr className="divider" />
			<div className="notification">
				{ notification }
			</div>
			<button className='btn btn-primary signout-btn' onClick={goOut}>SignOut</button>
		</div>
	);
}

const mapStateToProps = (state) => {
		const notifications = state.firestore.ordered.notifications;
	const notification = notifications ? notifications : [];
	return {
		notifications : notification,
		profile: state.firebase.profile,
		firestore : state.firestore,
		auth : state.firebase.auth
	}
}

export default compose(
	connect(mapStateToProps, { signOut }),
	firestoreConnect([{ collection : 'users'}, { collection : 'notifications', orderBy: ["time", "desc"]}])
)(TablesSideBar);
