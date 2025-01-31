import axios, { AxiosResponse } from 'axios'
import { AxiosServices } from '../axiosServices'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosServices', () => {
	let axiosServices: AxiosServices

	beforeEach(() => {
		axiosServices = AxiosServices.getInstance()
	})

	it('should create an instance of AxiosServices', () => {
		expect(axiosServices).toBeInstanceOf(AxiosServices)
	})

	it('should make a GET request', async () => {
		axiosServices = AxiosServices.getInstance()
		const mockData = { data: 'test data' }
		mockedAxios.get.mockResolvedValueOnce({ data: mockData } as AxiosResponse)

		const result = await axiosServices.get('/test-url')

		expect(result).toEqual(mockData)
		expect(mockedAxios.get).toHaveBeenCalledWith('/test-url', undefined)
	})

	it('should make a POST request', async () => {
		const mockData = { data: 'test data' }
		mockedAxios.post.mockResolvedValueOnce({ data: mockData } as AxiosResponse)

		const result = await axiosServices.post('/test-url', { key: 'value' })

		expect(result).toEqual(mockData)
		expect(mockedAxios.post).toHaveBeenCalledWith('/test-url', { key: 'value' }, undefined)
	})

	it('should make a PATCH request', async () => {
		const mockData = { data: 'test data' }
		mockedAxios.patch.mockResolvedValueOnce({ data: mockData } as AxiosResponse)

		const result = await axiosServices.patch('/test-url', { key: 'value' })

		expect(result).toEqual(mockData)
		expect(mockedAxios.patch).toHaveBeenCalledWith('/test-url', { key: 'value' }, undefined)
	})

	it('should build parameters correctly', () => {
		const params = { key1: 'value1', key2: 'value2' }
		const result = axiosServices['buildParameters'](params)

		expect(result).toBe('?key1=value1&key2=value2')
	})
})
