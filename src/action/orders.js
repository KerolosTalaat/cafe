import { getFirestore } from 'redux-firestore';

export const BaristaOrders = (order) =>{
	return (dispatch, getState) => {
		const firestore = getFirestore();
		firestore.collection('BaristaOrders').add({
			...order,
			createdAt : new Date()
		}).then(()=>{
			dispatch({type : 'GET_BARISTA_ORDER', payload : order})
		}).catch((err)=>{
			dispatch({type : 'GET_ORDER_ERROR' ,err})
		})
	}
};

export const fullOrder = (order, tableNum) =>{
	return (dispatch, getState) => {
		const profile = getState().firebase.profile;
		const firestore = getFirestore();
		firestore.collection('orders').add({
			...order,
			waiterName : profile.firstName + ' ' + profile.lastName,
			createdAt : new Date()
		}).then((res) => {
			firestore.collection('tables').doc(tableNum.toString()).update({ id : res._key.path.segments[1] });
		}).then(()=>{
			dispatch({type : 'GET_ORDER', payload : order})
		}).catch((err)=>{
			dispatch({type : 'GET_ORDER_ERROR' ,err})
		})
	}
};