import fs from 'fs'
import prettyBytes from 'pretty-bytes'

export default class FileHelper {
	constructor() {

	}

	static async getFileStatus(donloadsFolder) {
    const currentFiles = await fs.promises.readdir(donloadsFolder)
    const statuses = await Promise
        .all(
            currentFiles.map(file => fs.promises.stat(`${donloadsFolder}/${file}`)
        )
    )
    const fileStatuses = []

    for (const fileIndex in currentFiles) {
        const { birthtime, size } = statuses[fileIndex]
        console.log({ birthtime, size: prettyBytes(size) })
        fileStatuses.push({
             size: prettyBytes(size),
            file: currentFiles[fileIndex],
            lastModified: birthtime,
            owner: process.env.USER,
        })
    }
    return fileStatuses
	}
}
