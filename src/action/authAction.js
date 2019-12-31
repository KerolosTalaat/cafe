import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

export const signUp = (newUser) =>{
	return (dispatch) =>{
		const firebase = getFirebase();
		const firestore = getFirestore();
		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then(res =>{
			firestore.collection('users').doc(res.user.uid).set({
				firstName : newUser.firstName,
				lastName : newUser.lastName,
				role:newUser.role,
				time : new Date()
			}).then(()=>{
				dispatch({ type : 'SIGNUP_SUCCESS'})
			})
		}).catch((err) => {
			dispatch({ type : 'SIGNUP_FAILED', payload : 'Wrong e-mail or password', err: err.message});
		})
	} 
}

export const signOut = () =>{
	return (dispatch)=>{
		const firebase = getFirebase();
		firebase.auth().signOut().then(()=>{
			dispatch({ type : 'SIGNOUT_SUCCESS'})
		})
	}
}

export const signIn = (user) =>{
	return (dispatch) => {
		const firebase = getFirebase();
		firebase.auth().signInWithEmailAndPassword(
			user.email,
			user.password
		).then( () => {
			dispatch({ type : 'LOGIN_SUCCESS'});
		}).catch( (err) => {
			dispatch({ type : 'LOGIN_FAILED', payload : 'Wrong e-mail or password', err});
		})
	}
}