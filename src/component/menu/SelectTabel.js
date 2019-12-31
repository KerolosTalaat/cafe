import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { TableNum } from '../../action/LocalStore';
import TablesSideBar from './TablesSideBar';

const Home = ({ tables, firestore, history, TableNum }) => {
	if ( tables.length > 8 ){
		window.location.reload();
	} 
	const tableNumOption = tables.map((table, index) => {
		const chooseTable = (e) => {
			e.preventDefault();
			const tableNum = index+1;
			if ( tableNum === -1 || isNaN(tableNum) === true ){
				
			}
			else{
				TableNum(tableNum);
				console.log(tableNum);
				history.push("/menus");
			}
		}
		return(
			 table.id === '' ? (
				<div className='col-sm-4' key={index}>
					 <button className='btn btn-success' onClick={chooseTable}>{index+1}</button>
				 </div>	
			) : (
				<div className='col-sm-4' key={index}>
					 <button className='btn btn-danger' onClick={chooseTable}>{index+1}</button>
				</div>
				)
			)
	});
	
	
	return(
		<div className='container-fluid row table-num menu'>
			<div className="col-sm-4 col-lg-3">
				<TablesSideBar />
			</div>
			<div className="col-sm-8 col-lg-9 row">
			{tableNumOption}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	const tables = state.firestore.ordered.tables;
	const table = tables ? tables : [];
	return {
		tableId : state.tableId,
		tableState : state.tableState,
		tables: table,
		firestore: state.firestore
	}
} 

export default compose(
	connect(mapStateToProps, {TableNum}),
	firestoreConnect([{ collection : 'tables'}])
)(Home);