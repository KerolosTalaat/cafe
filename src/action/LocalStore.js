export const TableNum = (num) =>{
	return {
		type: 'TABLE_NUMBER',
		payload: num
	}
}

export const Order = (order) => {
	return {
		type: 'ADD_MEAL',
		payload: order
	}
}

export const removeMeal = (meal) => {
	return {
		type: 'REMOVE_MEAL',
		payload: meal
	}
} 