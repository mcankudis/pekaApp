'use strict';
const sanitize = {
  verifyWord: function(string) {                          // this function chcecks if the string
    const regex = /\W/i;                                  // contains any NON-WORD characters
    if(regex.test(string)) return false;                  // and if any is found, FALSE is returned;
    return true;
  },
  verifyString: function(string) {                        // this function chcecks if the string
    const regex = /[\$\{\}"']|(http|https|\/\/)/i;        // contains any of the forbidden characters
    if(regex.test(string)) return false;                  // and if any is found, returns FALSE;
    return true;
  },
  verifyBool: function(value) {
    if(typeof value!== 'boolean') return false;
    return true;
  },
  verifyNumber: function(num) {
    const regex = /\D/i;
    if(regex.test(num)) return false;
    return true;
  }
}

module.exports = sanitize
