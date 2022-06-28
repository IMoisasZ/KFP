function dateFormat(date) {
	return `${date.substring(6, 10)}-
		${date.substring(3, 5)}-
		${date.substring(0, 2)}`
}

export default dateFormat
