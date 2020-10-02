
const checkValid = (name, description) => {
  if (name && name.trim().length > 0 && description && description.trim().length > 0) {
    return true;
  }
  return false;
} 

module.exports = checkValid ;