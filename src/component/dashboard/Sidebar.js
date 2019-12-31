import React,{ useState } from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = ({sidebar}) => {
	
	const [className, setClassName] = useState({navItem: 'menu-closed', chevron:'fa-chevron-down', active: ''})
	const handleClick = () => {
		className.navItem === 'menu-closed' ? (
		setClassName({...className, navItem : '', chevron : 'fa-chevron-up', active:'active' })
		):(
		setClassName({...className, navItem : 'menu-closed', chevron : 'fa-chevron-down', active: ''}))
	};
	
	return(
		<React.Fragment>
			<div className={sidebar}>
				<header>
					<h3 className="brand-name">ELO2LO2A</h3>
					<hr className="divider" />
				</header>
				<ul className='list-unstyled'>
					<li className="nav-item" onClick={handleClick}>
						<span className={`nav-link ${className.active}`}>
							<i className="fas fa-user-plus"></i>
							<span>Add</span>
							<i className={`fas ${className.chevron}`}></i>
						</span>
					</li>
					<li className={`nav-item ml-3 ${className.navItem}`}>
						<NavLink to='/AddManager' activeClassName='active' className='nav-link'>Manager</NavLink>
					</li>
					<li className={`nav-item ml-3 ${className.navItem}`}>
						<NavLink to='/AddCashier' activeClassName='active' className='nav-link'>Cashier</NavLink>
					</li>
					<li className={`nav-item ml-3 ${className.navItem}`}>
						<NavLink to='/AddWaiter' activeClassName='active' className='nav-link'>Waiter</NavLink>
					</li>												
					<li className={`nav-item ml-3 ${className.navItem}`}>
						<NavLink to='/AddBarista' activeClassName='active' className='nav-link'>Barista</NavLink>
					</li>
					<hr className="divider" />
					<li className="nav-item">
						<NavLink to='/Charts' activeClassName='active' className='nav-link'>
          					<i className="fas fa-fw fa-chart-area"></i>
							<span>Charts</span>	
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to='/Orders' activeClassName='active' className='nav-link'>
          					<i className="fas fa-fw fa-table"></i>
							<span>Orders</span>	
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to='/Notification' activeClassName='active' className='nav-link'>
          					<i className="fas fa-bell"></i>
							<span>Notifications</span>	
						</NavLink>
					</li>
				</ul>
			</div>
		</React.Fragment>
	);
}

export default Sidebar;