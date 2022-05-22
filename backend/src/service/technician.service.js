import TechnicianRepository from '../repository/technician.repository.js'
import formatDocument from '../util/formatDocuments.util.js'

async function createTechnician(technician) {
	try {
		if (technician.rg.length < 9) {
			throw new Error('O rg incorreto!')
		}

		if (technician.cpf.length < 11) {
			throw new Error('O cpf incorreto!')
		}

		if (technician.car !== null && technician.plate === null) {
			throw new Error('A placa do veiculo deve ser informada!')
		}

		if (technician.system_user && technician.role_id === null) {
			throw new Error('O tipo de usuário deve ser preenchido!')
		}

		technician.name = technician.name.toUpperCase()
		technician.last_name = technician.last_name.toUpperCase()
		technician.cpf = formatDocument(technician.cpf)
		technician.rg = formatDocument(technician.rg)
		technician.plate = technician.plate ? technician.plate.toUpperCase() : null
		return await TechnicianRepository.createTechnician(technician)
	} catch (error) {
		throw error
	}
}

async function updateTechnician(technician) {
	try {
		if (technician.rg.length < 9) {
			throw new Error('O rg incorreto!')
		}

		if (technician.cpf.length < 11) {
			throw new Error('O cpf incorreto!')
		}

		if (technician.car !== null && technician.plate === null) {
			throw new Error('A placa do veiculo deve ser informada!')
		}

		if (technician.system_user && technician.role_id === null) {
			throw new Error('O tipo de usuário deve ser preenchido!')
		}

		technician.name = technician.name.toUpperCase()
		technician.last_name = technician.last_name.toUpperCase()
		technician.cpf = formatDocument(technician.cpf)
		technician.rg = formatDocument(technician.rg)
		technician.plate = technician.plate ? technician.plate.toUpperCase() : null
		return await TechnicianRepository.updateTechnician(technician)
	} catch (error) {
		throw error
	}
}

async function getAllTechnicians(technician) {
	try {
		if (technician.length === 1) {
			return await TechnicianRepository.getAllTechnicians(technician[0])
		} else {
			return await TechnicianRepository.getAllTechnicians()
		}
	} catch (error) {
		throw error
	}
}

async function getTechnician(technician_id) {
	try {
		return await TechnicianRepository.getTechnician(technician_id)
	} catch (error) {
		throw error
	}
}

async function deleteTechnician(technician_id) {
	try {
		return await TechnicianRepository.deleteTechnician(technician_id)
	} catch (error) {
		throw error
	}
}

async function disableEnableTechnician(technician) {
	try {
		return await TechnicianRepository.disableEnableTechnician(technician)
	} catch (error) {
		throw error
	}
}

export default {
	createTechnician,
	updateTechnician,
	getAllTechnicians,
	getTechnician,
	deleteTechnician,
	disableEnableTechnician,
}
