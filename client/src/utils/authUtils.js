function embedTokenInHeaders(headers, authToken) {
  // TODO: get auth token from reducer
  // TODO: re-write this function
  // let _auth = JSON.stringify({ 'authentication': authToken });
  headers = {
    ...headers,
    "authentication": authToken,
  }
  return headers;
}

export { embedTokenInHeaders };
