import React,{ useState } from 'react';
import { signIn } from '../../action/authAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

const SignIn = ({ signIn, errorMessage, auth, role, firestore }) =>{
	const [user, setInformation] = useState({email : '', password : ''});
	
	const handleChange = (e) =>{
		setInformation({ ...user, [e.target.id] : e.target.value });
	}
	
	const handleSubmit = (e) =>{
		e.preventDefault();
		signIn(user);
		setInformation({...user,email : '', password : ''});
	}
	const page = auth.uid ? (
		role === undefined ? '' : (
			role === '151' ? (
				firestore.collection('users').doc(auth.uid).update({isOnline: 'online'}),
				<Redirect to='/addManager'/>
			) :
			role === '152' ? (
				firestore.collection('users').doc(auth.uid).update({isOnline: 'online'}),
				<Redirect to='/table'/> 
			) :
			role === '153' ? (
				firestore.collection('users').doc(auth.uid).update({isOnline: 'online'}),
				<Redirect to='/baristaOrders'/> 
			) :
			( <Redirect to='/Orders'/> )
		)
	):(
		<div className="SignIn">
			<div className='container card' >
				<header>
					<h2 className="title">Sign In</h2>
				</header>
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<div className="form-group row">
							<label htmlFor="staticEmail" className="col-4 col-md-2 col-form-label">Email</label>
							<div className="col-8 col-md-10">
								<input type="e-mail" className="form-input" id="email" placeholder="Username" autoComplete='off' onChange={handleChange} value={user.email}/>
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="inputPassword" className="col-4 col-md-2 col-form-label">Password</label>
							<div className="col-8 col-md-10">
								<input type="password" className="form-input" id="password" placeholder="Password" onChange={handleChange} value={user.password} autoComplete='off'/>
							</div>
						</div>
						<p className='text-danger text-center'>{errorMessage} </p>
						<button className='btn btn-primary sign-button py-2 px-5'>Login</button>
					</form>
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
const mapStateToProps = (state) =>{
	return{
		auth : state.firebase.auth,
		errorMessage : state.auth.errorMessage,
		role: state.firebase.profile.role,
		firestore: state.firestore
	}
}


export default compose(
	connect(mapStateToProps, { signIn }),
	firestoreConnect([{ collection : 'users'}])
)(SignIn);