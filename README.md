# Image Clip related functions

# Install
```
npm i @appres/imgclip
```

## Import
```
const ImgClip = require('@appres/imgclip');

or

import { ImgClip } from '@appres/imgclip'

```

## Samples

### Paste image
#### You can use image from clipboard (Ctrl+V)

```javascript
ImgClip.paste((url) => {
    if(url.startsWith("blob:")) {
        ImgClip.imgurlToBase64(url).then((data) => {
            console.log("imgurlToBase64:");
            console.log(data);
            // ImgClip.revoke(url);
        });
        ImgClip.imgurlToArrayBuffer(url).then((data) => {
            console.log("imgurlToArrayBuffer:");
            console.log(data);
            // ImgClip.revoke(url);
        });
        ImgClip.imgurlToBytes(url).then((data) => {
            console.log("imgurlToBytes:");
            console.log(data);
            // ImgClip.revoke(url);
        });
        ImgClip.imgurlToReadable(url).then((data) => {
            console.log("imgurlToReadable:");
            console.log(data);
            // ImgClip.revoke(url);
        });
    }
});
```

### Image Resize
#### You can make small size image (ex; thumbnail)

```javascript

// 
// For Blob
// 
var image = new Image(1000, 1000);
let blobCallback = (blob) => {
    console.log("blob size:" + blob.size);
    console.log("blob type:" + blob.type);    
    blob.arrayBuffer().then(buffer => {
        let base64Img = ImgClip.bufferToBase64(buffer);
        let bytesImg = ImgClip.bufferToBytes(buffer);
    });
};
ImgClip.resize(image, { width: 200, height: 200, type: 'jpg', blobCallback: blobCallback });


// 
// For Base64
// 
var image = new Image(1000, 1000);
var base64Img = ImgClip.resize(image, { width: 200, height: 200, type: 'jpg' });


// Image type :
//    'png', 'gif', 'bmp', 'jpg', 'jpeg', 'webp'
//     default is 'png'
//    'jpg' will be to 'jpeg'

```
