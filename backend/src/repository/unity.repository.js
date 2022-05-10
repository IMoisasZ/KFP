import UnityModel from '../model/unity.model.js'

async function createUnity(unity) {
	try {
		return await UnityModel.create(unity)
	} catch (error) {
		throw error
	}
}

async function updateUnity(unity) {
	try {
		await UnityModel.update(unity, {
			where: {
				unity_id: unity.unity_id,
			},
		})
		return await getUnity(unity.unity_id)
	} catch (error) {
		throw error
	}
}

async function getUnits() {
	try {
		return await UnityModel.findAll()
	} catch (error) {
		throw error
	}
}

async function getUnity(unity_id) {
	try {
		return await UnityModel.findByPk(unity_id)
	} catch (error) {
		throw error
	}
}

async function deleteUnity(unity_id) {
	try {
		return await UnityModel.destroy({
			where: {
				unity_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function disableEnableUnity(unity) {
	try {
		await UnityModel.update(
			{
				unity_actived: unity.unity_actived,
			},
			{
				where: {
					unity_id: unity.unity_id,
				},
			},
		)
		return await getUnity(unity.unity_id)
	} catch (error) {
		throw error
	}
}

async function getByUnityTag(unity_tag) {
	try {
		return await UnityModel.findOne({
			where: {
				unity_tag,
			},
		})
	} catch (error) {
		throw error
	}
}

export default {
	createUnity,
	updateUnity,
	getUnits,
	getUnity,
	deleteUnity,
	disableEnableUnity,
	getByUnityTag,
}
