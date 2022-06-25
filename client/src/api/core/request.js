import axios from 'axios';
import FormData from 'form-data';

import { ApiError } from './ApiError';

function isDefined(value) {
  return value !== undefined && value !== null;
}

function isSuccess(status) {
  return status >= 200 && status < 300;
}

function getQueryString(params) {
  const qs = [];

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((value) => {
          qs.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
          );
        });
      } else {
        qs.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        );
      }
    }
  });

  if (qs.length > 0) {
    return `?${qs.join('&')}`;
  }

  return '';
}

function getUrl(options) {
  const path = options.path;
  const url = `http://localhost:4320${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }

  return url;
}

function getFormData(options) {
  const formData = new FormData();

  Object.keys(options.formData).forEach((key) => {
    const value = options.formData?.[key];
    if (isDefined(value)) {
      formData.append(key, value);
    }
  });

  return formData;
}

async function sendRequest(options, url, formData, body, headers) {
  const source = axios.CancelToken.source();

  const config = {
    url,
    headers,
    data: body || formData,
    method: options.method,
    cancelToken: source.token,
  };

  return await axios.request(config);
}

function getResponseBody(response) {
  if (response.status !== 204) {
    return response.data;
  }
}

function catchErrors(options, result) {
  const errors = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    ...options.errors,
  };

  const error = errors[result.status];
  if (error) {
    throw new ApiError(result, error);
  }

  if (!result.ok) {
    throw new ApiError(result, 'Generic Error');
  }
}

/**
 * Request using axios client
 * @param options The request options from the the service
 * @throws ApiError
 */
export async function request(options) {
  try {
    const url = getUrl(options);
    const formData = options.formData ? getFormData(options) : undefined;

    const response = await sendRequest(
      options,
      url,
      formData,
      options.body,
      options.headers,
    );
    const responseBody = getResponseBody(response);

    const result = {
      url,
      ok: isSuccess(response.status),
      status: response.status,
      statusText: response.statusText,
      body: responseBody,
    };

    catchErrors(options, result);

    return Promise.resolve(result.body);
  } catch (error) {
    return Promise.reject(error);
  }
}
