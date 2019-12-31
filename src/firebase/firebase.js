import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

var config = {
	apiKey: "AIzaSyB_-a4iUqhD9ZTj197xN26wXbnMZnPNolI",
	authDomain: "cafe-eaf7e.firebaseapp.com",
	databaseURL: "https://cafe-eaf7e.firebaseio.com",
	projectId: "cafe-eaf7e",
	storageBucket: "cafe-eaf7e.appspot.com",
	messagingSenderId: "1046178988931"
};
const db = firebase.initializeApp(config);

export default db;