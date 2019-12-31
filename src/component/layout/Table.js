import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ReactToExcel from 'react-html-table-to-excel';
import { MDBDataTable } from 'mdbreact';

const CashierPage = ({ orders, firestore, auth, history }) => {	
	const data = {
		columns: [
			{
				label: 'Order',
				field: 'order',
				sort: 'desc',
				width: '50'
			 },
			{
				label: 'Waiter name',
				field: 'waiter',
				sort: 'desc',
				width: 200
			 },
			 {
				label: 'Table',
				field: 'table',
				sort: 'desc',
				width: 270
			},
			{
				label: 'Total',
				field: 'total',
				sort: 'desc',
				width: 200
			},
			{
				label: 'Payment',
				field: 'payment',
				sort: 'desc',
				width: 200
			},
			{
				label: 'Date',
				field: 'date',
				sort: 'desc',
				width: 200
			},
		],
		rows: []
	};
	var total = 0,
		date,
		orderNum,
		row = {};
	if ( typeof orders[0] === 'undefined' ){
	} else {
		orders.map((order, index) => {
			const handleClick = () =>{
				history.push('/OrderDetails/' + index)
			}
			orderNum = orders.length - index;
			const dataTable = document.querySelector('.dataTable');  
			if ( dataTable === null ){	
			}else{
				document.querySelector('.dataTable').id = 'table';	
			}
        	var dd = new Date(order.createdAt.toDate()).getDate(); 
        	var mm = new Date(order.createdAt.toDate()).getMonth() + 1; 
       		var yyyy = new Date(order.createdAt.toDate()).getFullYear();
        	if (dd < 10) { 
            	dd = '0' + dd; 
        	} 
        	if (mm < 10) { 
				mm = '0' + mm; 
        	} 
        	date = dd + '/' + mm + '/' + yyyy;
			order.order.map((orderList, index) => {		
				total = total + orderList.price * orderList.quantity;
				return '';
			})
			row = { order: orderNum, waiter: order.waiterName, table: order.tableNum, total: total, payment: order.payment,
				   date: date,clickEvent: handleClick}
			data.rows.push(row);
			total = 0;
			return '';
		})
	}
	
	
	return (
		<React.Fragment>
				<div className='mt-1'>
					<MDBDataTable striped bordered hover data={data} />
					<div className="mt-2 mb-3 text-center">
						<ReactToExcel className="btn btn-primary px-5 py-1" table="table" filename="excel" sheet="sheet 1" buttonText="Export" />
					</div>
				</div>
		</React.Fragment>
	)
}



const mapStateToProps = (state) => {
	const orders = state.firestore.ordered.orders;
	const order = orders ? orders : [];
	return {
		orders: order,
		firestore: state.firestore,
		auth: state.firebase.profile
	}
} 

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection : 'orders', orderBy: ["createdAt", "desc"]}])
)(CashierPage);