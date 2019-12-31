import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; 
import { firebaseReducer } from 'react-redux-firebase';

const initState ={ errorMessage : ''}

const AuthReducers = (state = initState, action) =>{
	switch ( action.type ) {
		case 'LOGIN_SUCCESS' :
			return {...state, errorMessage : ''}
			case 'LOGIN_FAILED' :
			return {...state, errorMessage : action.payload}
		case 'SIGNUP_SUCCESS' :
			return {...state, errorMessage : ''}
		case 'SIGNUP_FAILED' :
			return {...state, errorMessage : action.err}
		case 'SIGNOUT_SUCCESS' :
			return {...state, errorMessage : ''}
		default :
			return {state}
	}
}

const tableNumReducer = ( state = null,action ) =>{
	if ( action.type === 'TABLE_NUMBER') {
			return state = action.payload
	} else {
		return state
	}
}

const orderReducers = ( order = [] ,action ) =>{
	if ( action.type === 'ADD_MEAL') {
		return [...order, action.payload];
	} else if (action.type === 'REMOVE_MEAL'){
		return order.filter((meal) => meal !== action.payload);
	} else {
		return order;
	}
} 

const getFullOrder = (state = [], action) =>{
	if ( action.type === 'GET_BARISTA_ORDER'){
		return [...state, action.payload];	
	} else if ( action.type === 'GET_ORDER_ERROR'){
		return state;
	}
	return state;
}

const getBaristaOrder = (state = [], action) =>{
	if ( action.type === 'GET_ORDER'){
		return [...state, action.payload];	
	} else if ( action.type === 'GET_ORDER_ERROR'){
		return state;
	}
	return state;
}


export default combineReducers({
	auth: AuthReducers,
	firebase : firebaseReducer,
	firestore : firestoreReducer,
	tableNum : tableNumReducer,
	order : orderReducers,
	fullOrder: getFullOrder,
	baristaOrder: getBaristaOrder
})