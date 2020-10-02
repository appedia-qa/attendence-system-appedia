var passValidator = require("password-validator");

var schema = new passValidator();

// Add properties to it
schema
  .is()
  .min(2) // Minimum length 8                            // Must have digits
  .has()
  .not()
  .spaces(); // Should not have spaces

export const passwordValidator = (password) => {
  return schema.validate(password);
};

export const emailValidator = (email) => {
  // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(email);
 return email.length > 0 ? true : false;
};
