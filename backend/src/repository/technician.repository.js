import TechnicianModel from '../model/technician.model.js'

async function createTechnician(technician) {
	try {
		const newTechnician = await TechnicianModel.create(technician)
		return await getTechnician(newTechnician.technician_id)
	} catch (error) {
		throw new Error('Técnico já cadastrado!')
	}
}

async function updateTechnician(technician) {
	try {
		await TechnicianModel.update(technician, {
			where: {
				technician_id: technician.technician_id,
			},
		})
		return await getTechnician(technician.technician_id)
	} catch (error) {
		throw new Error('Técnico já cadastrado!')
	}
}

async function getAllTechnicians(technicianStatus) {
	try {
		if (technicianStatus === true || technicianStatus === false) {
			return await TechnicianModel.findAll({
				where: {
					actived: technicianStatus,
				},
			})
		} else if (technicianStatus === undefined) {
			return await TechnicianModel.findAll()
		}
	} catch (error) {
		throw error
	}
}

async function getTechnician(technician_id) {
	try {
		return await TechnicianModel.findByPk(technician_id)
	} catch (error) {
		throw error
	}
}

async function deleteTechnician(technician_id) {
	try {
		await TechnicianModel.destroy({
			where: {
				technician_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function disableEnableTechnician(technician) {
	try {
		await TechnicianModel.update(
			{
				actived: technician.actived,
			},
			{
				where: {
					technician_id: technician.technician_id,
				},
			},
		)
		return await getTechnician(technician.technician_id)
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
