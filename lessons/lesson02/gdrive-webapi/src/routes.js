
import { logger } from './logger.js'
import FileHelper from './fileHelper.js'
import { dirname, resolve } from 'path'
import { fileURLToPath, parse } from 'url'
import UploadHandler from './uploadHandler.js'
import { pipeline } from 'stream/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const defaultDownloadsFolder = resolve(__dirname, '../', 'downloads')

export default class Routes {
	constructor(downloadsFolder = defaultDownloadsFolder) {
		this.downloadsFolder = downloadsFolder
		this.fileHelper = FileHelper
		this.io = {}
	}

	setSocketInstance(io) {
		this.io = io
	}

	async defaultRoute(request, response) {
		logger.info('defaultRoute')
		response.writeHead(204)
		response.end('Hello from Routes. You got it wrong!')
	}

	async options(request, response) {
		logger.info('options')
		response.writeHead(204)
		response.end()
	}

	async post(request, response) {
		const { headers } = request

		const { query: { socketId } } = parse(request.url, true)
		const uploaderHandler = new UploadHandler({
			socketId,
			io: this.io,
			downloadsFolder: this.downloadsFolder,
		})

		const onFinish = (response) => () => {
			response.writeHead(200)
			const data = JSON.stringify({
				result: 'Files successfully uploaded'
			})
			response.end(data)
		}

		const busboyInstance = uploaderHandler.registerEvents(headers, onFinish(response))

		await pipeline(request, busboyInstance)
		logger.info('-- post - Request finished with success')
	}

	async get(request, response) {
		logger.info('get')
		const files = await this.fileHelper.getFileStatus(this.downloadsFolder)
		response.writeHead(200)
		response.end(JSON.stringify(files))
	}

	handler(request, response) {
		logger.info('handler')
		response.setHeader('Access-Control-Allow-Origin', '*')
		const chosen = this[request.method.toLowerCase()] || this.defaultRoute

		return chosen.apply(this, [request, response])
	}
}
