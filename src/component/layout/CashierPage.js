import React from 'react';
import Navbar from './Navbar';
import Table from './Table';

const CashierPage = ({ history }) => {

	return (
		<React.Fragment>
			<Navbar />
			<div className="row">
				<div className="col-md-12">
					<Table history={history} />
				</div>
			</div>
		</React.Fragment>
	)
}


export default CashierPage;