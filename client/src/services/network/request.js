import axios from 'axios';
import { embedTokenInHeaders } from '../../utils/authUtils';
import { baseUrl } from '../../constants/urls';

class Api {
  constructor() {

    // Don't use it before confirmation
    this.baseURL = baseUrl;

    // this.axiosInstance = axios.create({
    //   baseURL: baseUrl
    // });

    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
  }

  // TODO: Get auth token from auth selector

  get({
    url,
    needsAuthentication = false,
    authToken = null
  }) {
    let { headers } = this;

    if (needsAuthentication) {
      headers = embedTokenInHeaders(headers, authToken);
    }

    // TODO: handle errors and responce
    return axios.get(url, { headers });
  }


  delete({
    url,
    needsAuthentication = false,
    authToken = null
  }) {

    let { headers } = this;

    if (needsAuthentication) {
      headers = embedTokenInHeaders(headers, authToken);
    }

    // TODO: handle errors and responce
    return axios.delete(url, { headers });
  }

  post({
    needsAuthentication = false,
    requestPayload = {},
    url,
    authToken
  }) {
    
    let { headers } = this;

    if (needsAuthentication) {
      headers = embedTokenInHeaders(headers, authToken);
    }

    const body = JSON.stringify(requestPayload);
    // TODO: handle errors and responce
    return axios.post(
      url, 
      body, 
      { 
        headers, 
        validateStatus: (status) => {
          return true;
        }, 
      });
  }

  put({
    needsAuthentication = false,
    requestPayload = {},
    url,
    authToken
  }) {
    let { headers } = this;

    if (needsAuthentication) {
      headers = embedTokenInHeaders(headers, authToken);
    }

    const body = JSON.stringify(requestPayload);
    // TODO: handle errors and responce
    return axios.put(url, body,  { headers });
  }
}

export default (new Api());
