const LexicaArt = require('../src/');

const main = async () => {
  const lexicaArt = new LexicaArt();
  const info = await lexicaArt.search('A steampunk teddy with a knife');
  console.log('Title', info[5].prompt);
  console.log('images', info[5].images);
}

main();