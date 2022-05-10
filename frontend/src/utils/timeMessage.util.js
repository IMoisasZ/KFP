function timeMessage(setMessage, setTypeMessage, time = 2000) {
	const timeOut = setTimeout(() => {
		setMessage('')
		setTypeMessage('')
	}, time)
	return timeOut
}

export default timeMessage
