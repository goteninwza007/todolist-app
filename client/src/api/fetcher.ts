const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export type ModifiedResponse<T = Record<string, unknown>> = {
  statusCode: number
  message: string
  data?: T
}

export class ResponseError<T = Record<string, unknown>> extends Error {
  statusCode?: number
  data?: T

  constructor(response: ModifiedResponse) {
    super(response.message)
    this.name = response.message
    this.statusCode = response.statusCode
    this.data = response.data as T
  }
}

const handleResponse = async <T>(
  res: Response,
): Promise<ModifiedResponse<T>> => {
  const json = await res.json()
  if (!res.ok) throw new ResponseError(json)
  return json as ModifiedResponse<T>
}

const handleError = (error: unknown): ModifiedResponse => {
  if (error instanceof ResponseError) throw error
  throw new ResponseError({ statusCode: 500, message: 'Unexpected error' })
}

export const Get = async <T>(url: string): Promise<ModifiedResponse<T>> => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return handleResponse<T>(res)
  } catch (error) {
    return handleError(error) as ModifiedResponse<T>
  }
}

export const Post = async <T>(
  url: string,
  body?: object,
): Promise<ModifiedResponse<T>> => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body ?? {}),
    })
    return handleResponse<T>(res)
  } catch (error) {
    return handleError(error) as ModifiedResponse<T>
  }
}

export const Put = async <T>(
  url: string,
  body?: object,
): Promise<ModifiedResponse<T>> => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body ?? {}),
    })
    return handleResponse<T>(res)
  } catch (error) {
    return handleError(error) as ModifiedResponse<T>
  }
}

export const Patch = async <T>(
  url: string,
  body?: object,
): Promise<ModifiedResponse<T>> => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PATCH',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body ?? {}),
    })
    return handleResponse<T>(res)
  } catch (error) {
    return handleError(error) as ModifiedResponse<T>
  }
}

export const Delete = async <T>(url: string): Promise<ModifiedResponse<T>> => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return handleResponse<T>(res)
  } catch (error) {
    return handleError(error) as ModifiedResponse<T>
  }
}
