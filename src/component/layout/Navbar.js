import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../../action/authAction';
import { connect } from 'react-redux';

const Navbar = ({ signOut, signIn }) => {
	return(	
		<div className="navbar navbar-expand-lg navbar-dark bg-dark p-3 mb-3">
			<div className='container'>
				<Link className="navbar-brand mr-auto" to="/">Cafe</Link>
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<NavLink to='/' activeClassName='active' className='nav-link' onClick ={ signOut }>SignOut</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default connect(null, { signOut })(Navbar);