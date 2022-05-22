function formatDocument(document, type) {
	const formatedDocument =
		type === 'rg'
			? `
	${document.substring(0, 2)}.
	${document.substring(2, 5)}.
	${document.substring(5, 8)}-
	${document.substring(8, 9)}`
			: `${document.substring(0, 3)}.
	${document.substring(3, 6)}.
	${document.substring(6, 9)}-
	${document.substring(9, 11)}`
	return formatedDocument
}

export default formatDocument
