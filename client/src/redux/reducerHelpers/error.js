export const parseErrorMessageFromAction = (action) => {
  if (action && action.error && action.error.message){
    return action.error.message
  } else if (action && action.error && typeof action.error === 'object') {
    return JSON.stringify(action.error)
  } else if (action && action.error) {
    return action.error
  } else {
    return "An unknown error occurred";
  }
}