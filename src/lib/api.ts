import { RequestOptions } from "http";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { auth0Options } from "../app/api/auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/v1';

async function handleResponse(response: any) {
  // console.log('response', response)
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `Error: ${response.status}`);
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    console.log('json response')
    return response.json();
  }
  console.log('text response')
  return response.text();
}

const apiCall = async (url: string, options: RequestOptions & { body?: any, params?: any }) => {
  const { method, headers = {}, body = null, params = {} } = options;
  const session = await getSession()

  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${API_BASE_URL}${url}${queryString ? `?${queryString}` : ''}`;

  const fetchOptions = {
    method,
    body,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (session as any)['accessToken'],
      ...headers,
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    console.log(`Fetching ${fullUrl}`)
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
