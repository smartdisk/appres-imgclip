'use strict';

const UrlEx = require('@appres/url');

Object.defineProperty(exports, "__esModule", { value: true });
var ImgClip = /** @class */ (function () {
  
  function ImgClip() {
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
  }
  const _imgurlToReadable = (imgurl) => {
    return fetch(imgurl).then(res => {
      return res.body;
    });
  }
  const _imgurlToArrayBuffer = (imgurl) => {
    return fetch(imgurl).then(res => {
      return res.arrayBuffer();
    });
  }
  const _imgurlToBase64 = (imgurl) => {
    return fetch(imgurl).then(res => {
      return res.arrayBuffer();
    }).then(arrayBuffer => {
      return _bufferToBase64(arrayBuffer);
    });
  }


  ImgClip.prototype.paste = function (listener) {
    if(typeof(listener) == "function"){
      window.addEventListener("paste", (event) => {   
        pasteImage(event, (image) => {
          let URLOBJ = window.URL || window.webkitURL;
          if(isURL(image)) {
            listener(image.toString());
          } else {
            let imgurl = URLOBJ.createObjectURL(image);
            listener(imgurl);  
          }
        });
      }, false);
    }
  };

  ImgClip.prototype.bufferToBase64 = function (buffer) {
    return _bufferToBase64(buffer);
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


  ImgClip.imgclip = new ImgClip();
  ImgClip.paste = function(listener) {
    return this.imgclip.paste(listener);
  };
  ImgClip.bufferToBase64 = function(buffer) {
    return this.imgclip.bufferToBase64(buffer);
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

  return ImgClip;
}());

module.exports = ImgClip;
module.exports.ImgClip = ImgClip;

