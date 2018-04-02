<<<<<<< HEAD
//var moment = require('moment');
=======
>>>>>>> ba52d36daad4b6bffe2042d8bdcb994df5b8c359

// Helper functions for doing all kind of validations on the request body inputs
module.exports.isString = function(str) {
  return typeof str === 'string';
};

module.exports.isNumber = function(num) {
  return !isNaN(num);
};

module.exports.isBoolean = function(bool) {
  return (
    bool === true ||
    bool === false ||
    toString.call(bool) === '[object Boolean]'
  );
};

<<<<<<< HEAD
// module.exports.isDate = function(date) {
//   return moment.isDate(date) || moment.isMoment(date);
// };
=======

>>>>>>> ba52d36daad4b6bffe2042d8bdcb994df5b8c359

module.exports.isObject = function(obj) {
  return typeof obj === 'object';
};

module.exports.isArray = function(arr) {
  return Array.isArray(arr);
};

module.exports.matchesRegex = function(str, regex) {
  return regex.test(str);
};
