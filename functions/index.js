const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const createNotifacation = (notification) =>{
	return admin.firestore().collection('notifications').add(notification).then(doc =>{
	})
}

exports.updateUser = functions.firestore.document('users/{userId}').onUpdate((change, context) => {
    const user = change.after.data();
	const notification = {
		role: 'Userstate',
		online: user.isOnline,
		content : `${user.firstName} ${user.lastName} is ${user.isOnline}`,
		time : admin.firestore.FieldValue.serverTimestamp()
	}
	return createNotifacation(notification);
});

exports.refusedOrder = functions.firestore.document('BaristaOrders/{orderId}').onUpdate((change, context) => {
    const order = change.after.data();
	const notification = {
		role: 'OrderState',
		orderState: order.orderState,
		content : `${order.baristaName} ${order.orderState} order for table ${order.tableNum}`,
		time : admin.firestore.FieldValue.serverTimestamp()
	}
	return createNotifacation(notification);
});