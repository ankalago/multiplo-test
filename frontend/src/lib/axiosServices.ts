import axios, { AxiosRequestConfig } from 'axios'

export type TGetParameters = Record<string, string | number | boolean | object>

export class AxiosServices {
	private static instance: AxiosServices

	// To prevent creating multiple instances (Singleton)
	private constructor() {
		axios.create({
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
	}

	static getInstance() {
		if (!AxiosServices.instance) {
			AxiosServices.instance = new AxiosServices()
		}

		return AxiosServices.instance
	}

	async get<T>(url: string, params?: TGetParameters, options?: AxiosRequestConfig) {
		try {
			const fullUrl = `${url}${this.buildParameters(params)}`
			const { data } = await axios.get<T>(fullUrl, options)
			if (!data) return null
			return data
		} catch (error) {
			throw new Error('AxiosServices | GET')
		}
	}

	async post<T, U>(url: string, body?: U, options?: AxiosRequestConfig) {
		try {
			const { data } = await axios.post<T>(url, body, options)
			if (!data) return null
			return data
		} catch (error) {
			throw new Error('AxiosServices | POST')
		}
	}

	async patch<T, U>(url: string, body?: U, options?: AxiosRequestConfig) {
		try {
			const { data } = await axios.patch<T>(url, body, options)
			if (!data) return null
			return data
		} catch (error) {
			throw new Error('AxiosServices | PATCH')
		}
	}

	private buildParameters(parameters?: TGetParameters) {
		if (!parameters) return ''

		const keys = Object.keys(parameters)

		const keyMap: string[] = keys.map((key) => `${key}=${parameters[key]}`)
		return '?' + keyMap.join('&')
	}
}
