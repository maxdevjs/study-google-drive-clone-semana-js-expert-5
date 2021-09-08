import {
    describe,
    test,
    expect,
    jest
} from '@jest/globals'
import fs from 'fs'

import Routes from '../../src/routes.js'
import FileHelper from '../../src/fileHelper.js'

describe('#FileHelper', () => {
    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const stateMock = {
                dev: 65025,
                mode: 33188,
                nlink: 1,
                uid: 1000,
                gid: 100,
                rdev: 0,
                blksize: 4096,
                ino: 5249933,
                size: 1195211,
                blocks: 2336,
                atimeMs: 1631005362587.6262,
                mtimeMs: 1631005362024.6152,
                ctimeMs: 1631005362024.6152,
                birthtimeMs: 1631005362016.615,
                atime: '2021-09-07T09:02:42.588Z',
                mtime: '2021-09-07T09:02:42.025Z',
                ctime: '2021-09-07T09:02:42.025Z',
                birthtime: '2021-09-07T09:02:42.017Z',
                owner: 'maxdevjs',
                file: 'file.png',
            }

            const mockUser = 'maxdevjs'
            process.env.USER = mockUser
            const filename = 'file.png'

            jest.spyOn(fs.promises, fs.readdir.name)
                .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(stateMock)

            const result = await FileHelper.getFileStatus("/tmp")

            const expectedResult = [
                {
                    size: '1.2 MB', // 1.2 MB
                    lastModified: stateMock.birthtime,
                    owner: mockUser,
                    file: filename,
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})
