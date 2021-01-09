'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
var ImgClip = /** @class */ (function () {
  
  function ImgClip() {
  }
  
  function _decode (encoded = '') {
    if (!_isString(encoded)) {
      throw new Error('Invalid');
    }
    return decodeURIComponent((encoded)
      .replace(/\+/g, '%20'));
  }

  ImgClip.prototype.encode = function(url){
    return _encode(url);
  };

  ImgClip.imgclip = new ImgClip();
  ImgClip.encode = function(url) {
    return this.imgclip.encode(url);
  };

  return ImgClip;
}());

module.exports = ImgClip;
module.exports.ImgClip = ImgClip;
