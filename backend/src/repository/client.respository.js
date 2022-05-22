import ClientModel from '../model/client.model.js'

async function createClient(client) {
	try {
		const newClient = await ClientModel.create(client)
		return await getClient(newClient.client_id)
	} catch (error) {
		throw new Error('Cliente já cadastrado!')
	}
}

async function updateClient(client) {
	try {
		await ClientModel.update(client, {
			where: {
				client_id: client.client_id,
			},
		})
		return await getClient(client.client_id)
	} catch (error) {
		throw new Error('Cliente já cadastrado!')
	}
}

async function getAllClient(client_status) {
	try {
		if (client_status === true || client_status === false) {
			return await ClientModel.findAll({
				where: {
					actived: client_status,
				},
			})
		} else if (client_status === undefined) {
			return await ClientModel.findAll()
		}
	} catch (error) {
		throw error
	}
}

async function getAllClientStatus(clientStatus) {
	try {
		return await ClientModel.findAll({
			where: {
				actived: clientStatus,
			},
		})
	} catch (error) {
		throw error
	}
}

async function getClient(client_id) {
	try {
		return await ClientModel.findByPk(client_id)
	} catch (error) {
		throw error
	}
}

async function deleteClient(client_id) {
	try {
		return await ClientModel.destroy({
			where: {
				client_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function disableEnableClient(client) {
	console.debug('repository', client)
	try {
		await ClientModel.update(
			{
				actived: client.actived,
			},
			{
				where: {
					client_id: client.client_id,
				},
			},
		)
		return await getClient(client.client_id)
	} catch (error) {
		throw error
	}
}

export default {
	createClient,
	updateClient,
	getAllClient,
	getClient,
	deleteClient,
	disableEnableClient,
}
