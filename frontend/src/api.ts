export class Api {
  static request<type>(method: string, path: string, body?: object, authToken?: string): Promise<type> {
    return fetch(`http://127.0.0.1:3000/${path}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : '',
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
  }

  static post<type>(path: string, body: object, authToken?: string): Promise<type> {
    return Api.request<type>('POST', path, body, authToken)
  }

  static get<type>(path: string, params: Record<string, string>, authToken?: string): Promise<type> {
    return Api.request<type>('GET', path + '?' + new URLSearchParams(params).toString(), undefined, authToken)
  }

  static put<type>(path: string, body: object, authToken?: string): Promise<type> {
    return Api.request<type>('PUT', path, body, authToken)
  }

  static delete<type>(path: string, body: object, authToken?: string): Promise<type> {
    return Api.request<type>('DELETE', path, body, authToken)
  }
}
