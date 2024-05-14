import { API_BASE_URL } from 'config/variables'
import { ResponseError } from '../api/error-entity'
import { getAccessToken } from './auth-token-service'

const token = getAccessToken()
const authorizationHeader = `Bearer ${token || ''}`

export class BaseHttpService {
  getErrorMessage(message: string): string | undefined {
    return message
  }

  onResponse(response: any) {
    if (
      typeof response.data === 'object' &&
      'ok' in response.data &&
      !response.data.ok
    ) {
      const error = new ResponseError(
        response,
        this.getErrorMessage(response.data.message)
      )

      throw error
    }
  }

  async get(url: string, config?: RequestInit): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
      },
      ...config,
    })
    this.onResponse(response)
    return response as unknown as Promise<Response>
  }

  async post(url: string, data?: any, config?: RequestInit): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
      },
      body: JSON.stringify(data),
      ...config,
    })
    this.onResponse(response)
    return response as unknown as Promise<Response>
  }

  async put(url: string, data?: any, config?: RequestInit): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
      },
      body: JSON.stringify(data),
      ...config,
    })
    this.onResponse(response)
    return response as unknown as Promise<Response>
  }

  async delete(url: string, config?: RequestInit): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
      },
      ...config,
    })
    this.onResponse(response)
    return response as unknown as Promise<Response>
  }

  async patch(
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
      },
      body: data,
      ...config,
    })
    this.onResponse(response)
    return response as unknown as Promise<Response>
  }
}
