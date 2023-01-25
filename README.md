
# LexicaArt

Search and create images using artificial intelligence. It is an unofficial implementation of the [LexicaArt](https://lexica.art) site to be able to use easily and quickly


## Installation

Install this project with npm

```bash
  npm install --save lexicaart
```

## Before running

You need to obtain the sessionToken and csrfToken data, which are obtained by entering the [LexicaArt](https://lexica.art) site, logging in, accessing the site's cookies and obtaining the values ​​of:

- __Secure-next-auth.session-token
- __Host-next-auth.csrf-token
## Demo

Example of an image search

```js
const LexicaArt = require('lexicaart');

const main = async () => {
  const lexicaart = new LexicaArt();
  const images = await lexicaart.search('A steampunk teddy with a knife');
  console.log('Title', images[0].prompt);
  console.log('images', images[0].images);
}

main();
```

Example of creating an image

```js
const LexicaArt = require('lexicaart');

const main = async () => {
  const lexicaart = new LexicaArt({
    sessionToken: 'YOUR_SESSION_TOKEN',
    csrfToken: 'YOUR_CSRF_TOKEN'
  });
  const info = await lexicaart.create('A steampunk teddy with a knife');
  console.log('INFO', info);
}

main();
```

OUTPUTS

```js
[
  {
    id: 'e9cdd....',
    prompt: 'A steampunk teddy with a knife',
    negativePrompt: '',
    grid: false,
    seed: '136972',
    c: 7,
    model: 'lexica-aperture-v2',
    width: 512,
    height: 768,
    userid: 'cldapr....',
    timestamp: '2023-01-24T21:13:15.545Z',
    ip_address: '201.22.....',
    is_private: false,
    fingerprint_id: '7W7J0D....',
    guidanceScale: 7,
    images: [
      {
        id: '82ce215....',
        url: 'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/82ce2153-1e86-46e9-9fef-4870f812b90f',
        promptid: 'e9cdd....',
        width: 512,
        height: 768,
        upscaledHeight: 3072,
        upscaledWidth: 2048,
        userId: 'cldap....',
        isUpscale: false
      },
      {
        id: '9671d9....',
        url: 'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/9671d9ff-9408-4d30-8b78-9867b9648972',
        promptid: 'e9cdd....',
        width: 512,
        height: 768,
        upscaledHeight: 3072,
        upscaledWidth: 2048,
        userId: 'cldapr....',
        isUpscale: false
      },
      ....
    ]
  }
]
```
## Authors

- [@luiscruzga](https://www.github.com/luiscruzga)

