import UnityService from '../service/unity.service.js'

async function createUnity(req, res, next) {
	try {
		const unity = req.body
		if (!unity.unity_tag) {
			return res.status(400).json({ error: 'A unidade é obrigatória!' })
		}

		if (!unity.unity_description)
			return res
				.status(400)
				.json({ error: 'A descrição da unidade é obrigatória!' })

		res.send(await UnityService.createUnity(unity))

		logger.info(`POST - /unity - ${JSON.stringify(unity)}`)
	} catch (error) {
		next(error)
	}
}

async function updateUnity(req, res, next) {
	try {
		const unity = req.body
		if (!unity.unity_tag)
			return res.status(400).json({ error: 'A unidade é obrigatória!' })

		if (!unity.unity_description)
			return res
				.status(400)
				.json({ error: 'A descrição da unidade é obrigatória!' })

		res.send(await UnityService.updateUnity(unity))

		logger.info(`PUT - /unity - ${JSON.stringify(unity)}`)
	} catch (error) {
		next(error)
	}
}

async function getUnits(req, res, next) {
	try {
		res.send(await UnityService.getUnits())

		logger.info(`GET - /unity - ALL UNITS`)
	} catch (error) {
		next(error)
	}
}

async function getUnity(req, res, next) {
	try {
		res.send(await UnityService.getUnity(req.params.unity_id))

		logger.info(`GET - /unity/${req.params.unity_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteUnity(req, res, next) {
	try {
		await UnityService.deleteUnity(req.params.unity_id)
		res.status(200).json({ msg: 'Unidade deletada com sucesso!' })

		logger.info(`DELETE - /unity/${req.params.unity_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnableUnity(req, res, next) {
	try {
		const unity = req.body

		res.send(await UnityService.disableEnableUnity(unity))

		logger.info(`PATCH - /unity - ${JSON.stringify(unity)}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createUnity,
	updateUnity,
	getUnits,
	getUnity,
	deleteUnity,
	disableEnableUnity,
}
