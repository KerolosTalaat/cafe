import React, { useState } from 'react';
import { signUp } from '../../action/authAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';

const AddWaiter = ({ signUp, auth, errorMessage }) =>{
	const [ user, addUser] = useState({ firstName : '', lastName : '', email : '', password : '',role: '152',isOnline:'offline'});
	
	const handleChange = (e)=>{
		addUser({...user, [e.target.id] : e.target.value});
	};
	
	const handleSubmit = (e) =>{
		e.preventDefault();
		signUp(user);
		return <Redirect to='/'/>
	};
	
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
			<div className="container-fluid SignUp">		
				<button className='nav-btn'onClick={handleClick}>
					<div className='btn-div'></div>
					<div className='btn-div'></div>
					<div className='btn-div'></div>
				</button>
				<div className='container card' >
					<header>
						<h2 className="title">Waiter</h2>
					</header>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<input type="text" className="form-input" id="firstName" placeholder="First name" autoComplete='off' onChange={handleChange} value={user.firstName}/>
							</div>
							<div className="form-group">
								<input type="text" className="form-input" id="lastName" placeholder="Last name" autoComplete='off' onChange={handleChange} value={user.LastName}/>
							</div>
							<div className="form-group">
								<input type="text" className="form-input" id="email" placeholder="Email" autoComplete='off' onChange={handleChange} value={user.email}/>
							</div>
							<div className="form-group">
								<input type="password" className="form-input" id="password" placeholder="Password" onChange={handleChange} value={user.password} autoComplete='off'/>
							</div>
							<p className='text-danger text-center'>{errorMessage}</p>
							<button className='btn btn-primary sign-button py-2 px-5'>Signup</button>
						</form>
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

const mapStateToProps = (state) =>{
	return{
		auth : state.firebase.auth,
		errorMessage : state.auth.errorMessage
	}
}

export default connect(mapStateToProps, { signUp })(AddWaiter);