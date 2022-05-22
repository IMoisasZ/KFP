function formatDocument(document) {
	const formatedDocument = document.replace(/\.|\-/g, '')
	return formatedDocument
}

export default formatDocument
