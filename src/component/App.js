import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './menu/Menu';
import Dessert from './menu/Dessert';
import Drinks from './menu/Drinks';
import Meals from './menu/Meals';
import Pizza from './menu/Pizza';
import Sandwiches from './menu/Sandwiches';
import Seafood from './menu/Seafood';
import SelectTabel from './menu/SelectTabel';
import AddManager from './Auth/AddManager';
import AddCashier from './Auth/AddCashier';
import AddWaiter from './Auth/AddWaiter';
import AddBarista from './Auth/AddBarista';
import SignIn from './Auth/SignIn';
import BaristaPage from './layout/BaristaPage';
import CashierPage from './layout/CashierPage';
import OrderDetails from './layout/OrderDetails';
import Charts from './dashboard/Charts';
import Notification from './dashboard/Notification';
import Orders from './dashboard/Orders';
import Stock from './dashboard/Stock';
import '../scss/app.scss';

const App = () => {
	return(
		<BrowserRouter>
			<React.Fragment>
				<Switch>
					<Route path='/' exact component={SignIn} />
					<Route path='/table' component={SelectTabel} />
					<Route path='/menus' component={Menu} />
					<Route path='/menu/dessert' component={Dessert} />
					<Route path='/menu/drinks' component={Drinks} />
					<Route path='/menu/meals' component={Meals} />
					<Route path='/menu/pizza' component={Pizza} />
					<Route path='/menu/sandwiches' component={Sandwiches} />
					<Route path='/menu/seafood' component={Seafood} />
					<Route path='/AddManager' component={AddManager} />
					<Route path='/AddCashier' component={AddCashier} />
					<Route path='/AddWaiter' component={AddWaiter} />
					<Route path='/AddBarista' component={AddBarista} />
					<Route path='/BaristaOrders' component={BaristaPage} />		
					<Route path='/CashierOrders' component={CashierPage} />		
					<Route path='/Notification' component={Notification} />		
					<Route path='/Charts' component={Charts} />		
					<Route path='/Orders' component={Orders} />		
					<Route path='/OrderDetails/:id' component={OrderDetails} />
					<Route path='/Stock' component={Stock} />
				</Switch>
			</React.Fragment>
		</BrowserRouter>
	);
}

export default App;
