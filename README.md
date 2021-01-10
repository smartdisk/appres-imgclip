# URL related functions

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

## Sample
### Paste image data from clipboard as base64 format.

```javascript
ImgClip.paste((url) => {
    if(url.startsWith("blob:")) {
        ImgClip.imgurlToBase64(url).then((data) => {
            console.log("imgurlToBase64:");
            console.log(data);
        });
        ImgClip.imgurlToArrayBuffer(url).then((data) => {
            console.log("imgurlToArrayBuffer:");
            console.log(data);
        });
        ImgClip.imgurlToBytes(url).then((data) => {
            console.log("imgurlToBytes:");
            console.log(data);
        });
        ImgClip.imgurlToReadable(url).then((data) => {
            console.log("imgurlToReadable:");
            console.log(data);
        });
    }
});
```


