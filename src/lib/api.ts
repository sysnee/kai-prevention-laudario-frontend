import { RequestOptions } from "http";
import { getSession, signIn } from "next-auth/react";
import jwt from "jsonwebtoken";

let API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/v1';

async function handleResponse(response: any) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `Error: ${response.status}`);
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

const apiCall = async (url: string, options: RequestOptions & { body?: any, params?: any }) => {
  const { method, headers = {}, body = null, params = {} } = options;
  const session = await getSession()

  if (!session) {
    signIn('auth0')
  }

  const queryString = new URLSearchParams(params).toString();
  if (url[0] !== '/') {
    url = '/' + url
  }

  if (API_BASE_URL[API_BASE_URL.length - 1] === '/') {
    API_BASE_URL = API_BASE_URL.slice(0, -1);
  }

  const fullUrl = `${API_BASE_URL}${url}${queryString ? `?${queryString}` : ''}`;
  console.log('session.user', session.user);
  const sessionJwt = jwt.sign(session.user, 'any')

  const fetchOptions = {
    method,
    body,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Session': 'Bearer ' + sessionJwt,
      'Authorization': 'Bearer ' + (session as any)['accessToken'],
      ...headers,
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(fullUrl, fetchOptions as RequestInit);
    return await handleResponse(response);
  } catch (error: any) {
    throw new Error(error.message || 'Network error');
  }
};

export default {
  get: async (url: string, params?: any) => apiCall(url, { method: 'GET', params }),
  post: async (url: string, body?: any, params?: any) => apiCall(url, { method: 'POST', body, params }),
  put: async (url: string, body?: any, params?: any) => apiCall(url, { method: 'PUT', body, params }),
  delete: async (url: string, params?: any) => apiCall(url, { method: 'DELETE', params }),
};
