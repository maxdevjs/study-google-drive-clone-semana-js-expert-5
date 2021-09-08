import {
  describe,
  test,
  expect,
  jest
} from '@jest/globals'

import Routes from '../../src/routes.js'

describe('#Routes test suite', () => {
  const defaultParams = {
    request: {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: '',
      body: {},
    },
    response: {
      setHeader: jest.fn(),
      writeHead: jest.fn(),
      end: jest.fn(),
    },
    values: () => Object.values(defaultParams)
  }
  describe('#setSocketInstance', () => {
    test('setSocketInstance should store io instance', () => {
      const routes = new Routes()
      const ioObj = {
        to: (id) => ioObj,
        emit: (event, message) => { }
      }

      routes.setSocketInstance(ioObj)
      expect(routes.io).toStrictEqual(ioObj)
    })
  })

  describe('#handler', () => {

    test('given an inexistent route should choose default route', async () => {
      const routes = new Routes()
      const params = {
        ...defaultParams
      }

      params.request.method = 'inexistent'
      await routes.handler(...params.values())
      expect(params.response.end).toHaveBeenCalledWith('Hello from Routes. You got it wrong!')
    })

    test('it should set any request with CORS enabled', async () => {
      const routes = new Routes()
      const params = {
        ...defaultParams
      }

      params.request.method = 'inexistent'
      await routes.handler(...params.values())
      expect(params.response.setHeader)
        .toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
    })

    test('given methods OPTIONS should choose options route', async () => {
      const routes = new Routes()
      const params = {
        ...defaultParams
      }

      params.request.method = 'OPTIONS'
      await routes.handler(...params.values())
      expect(params.response.writeHead)
        .toHaveBeenCalledWith(204)
      expect(params.response.end).toHaveBeenCalled()
    })

    test('given methods POST should choose post route', async () => {
      const routes = new Routes()
      const params = {
        ...defaultParams
      }

      params.request.method = 'POST'

      jest.spyOn(routes, routes.post.name).mockResolvedValue()

      await routes.handler(...params.values())
      expect(routes.post)
        .toHaveBeenCalled()
    })

    test('given methods GET should choose get route', async () => {
      const routes = new Routes()
      const params = {
        ...defaultParams
      }

      params.request.method = 'GET'

      jest.spyOn(routes, routes.get.name).mockResolvedValue()

      await routes.handler(...params.values())
      // expect(params.response.writeHead)
      // .toHaveBeenCalledWith(200)
      expect(routes.get).toHaveBeenCalled()
      // expect(params.response.end).toHaveBeenCalled()
    })
  })

  describe('#get', () => {
    test('given method GET it should list all the downloaded files', async () => {
      const routes = new Routes()
      const params = {
        ...defaultParams
      }
      const fileStatusesMock = [
        {
          size: '1.2 MB', // 1.2 MB
          lastModified: '2021-09-07T09:02:42.017Z',
          owner: 'pinco pallino',
          file: 'file.txt',
        }
      ]

      jest.spyOn(routes.fileHelper, routes.fileHelper.getFileStatus.name)
        .mockResolvedValue(fileStatusesMock)

      params.request.method = 'GET'

      await routes.handler(...params.values())

      expect(params.response.writeHead).toHaveBeenCalledWith(200)
      expect(params.response.end).toHaveBeenCalledWith(JSON.stringify(fileStatusesMock))
    })
  })
})
