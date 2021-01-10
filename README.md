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
ImgClip.paste((blob) => {
    if(blob.startsWith("blob:")) {
        ImgClip.imgurlToBase64(blob).then((data) => {
            console.log(data);
        });
    }
});
```


