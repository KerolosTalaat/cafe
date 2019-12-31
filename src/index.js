import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './component/App';
import reducers from './reducers';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import db from './firebase/firebase';

const store = createStore(reducers, compose(
	applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
	reduxFirestore(db),
	reactReduxFirebase(db, {attachAuthIsReady:true, useFirestoreForProfile:true, userProfile:'users'})
));

store.firebaseAuthIsReady.then(()=>
	ReactDom.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.querySelector('#root'))
)