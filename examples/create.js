const LexicaArt = require('../src/');

const main = async () => {
  const lexicaArt = new LexicaArt({
    sessionToken: 'YOUR_SESSION_TOKEN',
    csrfToken: 'YOUR_CSRF_TOKEN'
  });
  const info = await lexicaArt.create('A steampunk teddy with a knife');
  console.log('INFO', info);
}

main();