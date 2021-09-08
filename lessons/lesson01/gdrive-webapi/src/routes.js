
import { logger } from './logger.js'
import FileHelper from './fileHelper.js'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const defaultDownloadsFolder = resolve(__dirname, '../', 'downloads')

export default class Routes {
	io
	constructor(downloadsFolder = defaultDownloadsFolder) {
		this.downloadsFolder = downloadsFolder
		this.fileHelper = FileHelper
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
		logger.info('post')
		response.end()
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
