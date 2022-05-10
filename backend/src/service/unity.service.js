import UnityRepository from '../repository/unity.repository.js'

async function createUnity(unity) {
	try {
		const foundUnity = await UnityRepository.getByUnityTag(unity.unity_tag)

		if (foundUnity) {
			throw new Error('Unidade já cadastrada!')
		}

		unity.unity_tag = unity.unity_tag.toUpperCase()
		unity.unity_description = unity.unity_description.toUpperCase()

		return await UnityRepository.createUnity(unity)
	} catch (error) {
		throw error
	}
}

async function updateUnity(unity) {
	try {
		unity.unity_tag = unity.unity_tag.toUpperCase()
		unity.unity_description = unity.unity_description.toUpperCase()
		return await UnityRepository.updateUnity(unity)
	} catch (error) {
		throw error
	}
}

async function getUnits() {
	return await UnityRepository.getUnits()
}

async function getUnity(unity_id) {
	return await UnityRepository.getUnity(unity_id)
}

async function deleteUnity(unity_id) {
	return await UnityRepository.deleteUnity(unity_id)
}

async function disableEnableUnity(unity) {
	return await UnityRepository.disableEnableUnity(unity)
}

export default {
	createUnity,
	updateUnity,
	getUnits,
	getUnity,
	deleteUnity,
	disableEnableUnity,
}
