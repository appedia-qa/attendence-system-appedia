import Api from '../services/network/request';

// Dont use it

function makePostRequest(
  url = '',
  requestPayload = {},
  needsAuthentication = false,
  authToken = '',
) {
  return Api.post({
    url,
    requestPayload,
    needsAuthentication,
    authToken,
  });
}

function makePutRequest(
  url = '',
  requestPayload = {},
  needsAuthentication = false,
  authToken = '',
) {
  return Api.put({
    url,
    requestPayload,
    needsAuthentication,
    authToken,
  });
}

function makeGetRequest(url = '',  needsAuthentication = false, authToken='') {
  return Api.get({
    url,
    needsAuthentication,
    authToken,
  });
}

function makeDeleteRequest(url = '',  needsAuthentication = false, authToken='') {
  return Api.delete({
    url,
    needsAuthentication,
    authToken,
  });
}

function isNetworkConnected() {

  // TODO: implement or remove it
  return true;
}
export {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  isNetworkConnected,
  makePutRequest,
};

