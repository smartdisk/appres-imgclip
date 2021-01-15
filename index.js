'use strict';

const UrlEx = require('@appres/url');

Object.defineProperty(exports, "__esModule", { value: true });
var ImgClip = /** @class */ (function () {
  
  var IMG_TYPE_PNG = 'png';
  var IMG_TYPE = [IMG_TYPE_PNG, 'gif', 'bmp', 'jpeg', 'webp'];

  function ImgClip() {
    for (var i = 0; i < IMG_TYPE.length; i++) {
      ImgClip[IMG_TYPE[i].toUpperCase()] = IMG_TYPE[i];
    }  
  }

  function isURL(s) {
    if(s==null) return false;
    return (s instanceof URL);
  }


  const pasteImage = (event, listener) => {
    if(event.clipboardData && event.clipboardData.items) {
      // https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem
      var items = event.clipboardData.items;
      for (var i = 0; i < items.length; i++) {
        let type = items[i].type;
        if (type.indexOf("text/plain") == 0) {
          items[i].getAsString((s)=>{
            let url = UrlEx.checkURL(s, ['http', 'https','ftp','ftps']);
            if(url) {
              listener(url);
            }  
          });
        } else
        if (type.indexOf("image") == 0) {
          var blob = items[i].getAsFile();
          listener(blob);  
        }
      }
    }  
  };

  const _bufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  };
  const _bufferToBytes = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return binary;
  };
  const _imgurlToReadable = (imgurl) => {
    return fetch(imgurl).then(res => {
      return res.body;
    });
  };
  const _imgurlToArrayBuffer = (imgurl) => {
    return fetch(imgurl).then(res => {
      return res.arrayBuffer();
    });
  };
  const _imgurlToBase64 = (imgurl) => {
    return fetch(imgurl).then(res => {
      return res.arrayBuffer();
    }).then(arrayBuffer => {
      return _bufferToBase64(arrayBuffer);
    });
  };
  const _imgurlToBytes = (imgurl) => {
    return fetch(imgurl).then(res => {
      return res.arrayBuffer();
    }).then(arrayBuffer => {
      return _bufferToBytes(arrayBuffer);
    });
  };

  const _newImageSize = (img, options) => {
    const detImg = img.width / img.height;
    let width = options.width;
    let height = options.geight;
    if (width > 0 && height > 0) {
      if (width / height > detImg) {
        height = width / detImg;
      } else {
        width = height * detImg;
      }
      return { width: width, height: height };
    } else if (width > 0) {
      return { width: width, height: width / detImg };
    } else if (height > 0) {
      return { width: height * detImg, height: height };
    } else {
      return { width: img.width, height: img.height };
    }
  };

  const _resize2Canvas = (img, options) => {
    if (!img) {
      throw new Error('`img` is required.');
    }
    if (!options) {
      throw new Error('`options` is required.');
    }
    let newSize = _newImageSize(img, options);    
    let canvas = document.createElement('canvas');
    canvas.width = newSize.width;
    canvas.height = newSize.height;
    let context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, newSize.width, newSize.height);
    return canvas;
  };
  const _resize = (img, options) => {
    if(options.type=="jpg") options.type = "jpeg";
    if(IMG_TYPE.indexOf(options.type) < 0) {
      options.type = IMG_TYPE_PNG;
    }
    var canvas = _resize2Canvas(img, options);
    var context = canvas.getContext('2d');
    if(options.type !== IMG_TYPE_PNG) {
      context.globalCompositeOperation = 'destination-over';
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = '';
    }
    if(options.blobCallback) {
      canvas.toBlob(options.blobCallback, 'image/' + options.type);
      return null;
    }
    return canvas.toDataURL('image/' + options.type);
  };

  ImgClip.prototype.paste = function (listener) {
    if(typeof(listener) == "function"){
      window.addEventListener("paste", (event) => {   
        pasteImage(event, (image) => {
          if(isURL(image)) {
            listener(image.toString());
          } else {
            let URLOBJ = window.URL || window.webkitURL;
            let imgurl = URLOBJ.createObjectURL(image);
            listener(imgurl);  
          }
        });
      }, false);
    }
  };

  ImgClip.prototype.revoke = function(imgurl) {
    let URLOBJ = window.URL || window.webkitURL;
    URLOBJ.revokeObjectURL(imgurl);  
  };

  ImgClip.prototype.bufferToBase64 = function (buffer) {
    return _bufferToBase64(buffer);
  };
  ImgClip.prototype.bufferToBytes = function (buffer) {
    return _bufferToBytes(buffer);
  };

  ImgClip.prototype.imgurlToBase64 = function (imgurl) {
    return _imgurlToBase64(imgurl);
  };
  ImgClip.prototype.imgurlToReadable = function (imgurl) {
    return _imgurlToReadable(imgurl);
  };
  ImgClip.prototype.imgurlToArrayBuffer = function (imgurl) {
    return _imgurlToArrayBuffer(imgurl);
  };
  ImgClip.prototype.imgurlToBytes = function (imgurl) {
    return _imgurlToBytes(imgurl);
  };

  ImgClip.prototype.resize2Canvas = function (img, options) {
    return _resize2Canvas(img, options);
  };
  ImgClip.prototype.resize = function (img, options) {
    return _resize(img, options);
  };

  ImgClip.imgclip = new ImgClip();
  ImgClip.paste = function(listener) {
    return this.imgclip.paste(listener);
  };
  ImgClip.revoke = function(imgurl) {
    return this.imgclip.revoke(imgurl);
  };

  ImgClip.bufferToBase64 = function(buffer) {
    return this.imgclip.bufferToBase64(buffer);
  };
  ImgClip.bufferToBytes = function(buffer) {
    return this.imgclip.bufferToBytes(buffer);
  };

  ImgClip.imgurlToBase64 = function(imgurl) {
    return this.imgclip.imgurlToBase64(imgurl);
  };
  ImgClip.imgurlToReadable = function(imgurl) {
    return this.imgclip.imgurlToReadable(imgurl);
  };
  ImgClip.imgurlToArrayBuffer = function(imgurl) {
    return this.imgclip.imgurlToArrayBuffer(imgurl);
  };
  ImgClip.imgurlToBytes = function(imgurl) {
    return this.imgclip.imgurlToBytes(imgurl);
  };

  ImgClip.resize2Canvas = function(img, options) {
    return this.imgclip.resize2Canvas(img, options);
  };
  ImgClip.resize = function(img, options) {
    return this.imgclip.resize(img, options);
  };
  
  return ImgClip;
}());

module.exports = ImgClip;
module.exports.ImgClip = ImgClip;

