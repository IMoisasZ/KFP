import ClientRepository from '../repository/client.respository.js'

async function createClient(client) {
	try {
		client.name = client.name.toUpperCase()
		return await ClientRepository.createClient(client)
	} catch (error) {
		throw error
	}
}

async function updateClient(client) {
	try {
		client.name = client.name.toUpperCase()
		return await ClientRepository.updateClient(client)
	} catch (error) {
		throw error
	}
}

async function getAllClient(client) {
	try {
		if (client.length === 1) {
			return await ClientRepository.getAllClient(client[0])
		} else {
			return await ClientRepository.getAllClient()
		}
	} catch (error) {
		throw error
	}
}

async function getClient(client_id) {
	return await ClientRepository.getClient(client_id)
}

async function deleteClient(client_id) {
	return await ClientRepository.deleteClient(client_id)
}

async function disableEnableClient(client) {
	return await ClientRepository.disableEnableClient(client)
}

export default {
	createClient,
	updateClient,
	getAllClient,
	getClient,
	deleteClient,
	disableEnableClient,
}
