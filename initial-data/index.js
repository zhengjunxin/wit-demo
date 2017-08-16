const fs = require('fs');
const fetch = require('node-fetch');
const {validateSamples, queryWit} = require('../shared');

const TAB = '	';
const data = fs
  .readFileSync('initial-data/data.tsv', 'utf-8')
  .split('\r')
  .map(row => row.split(TAB));

const samples = data.map(([text, value]) => {
  return {
    text,
    entities: [
      {
        entity: 'intent',
        value,
      },
    ],
  };
});


validateSamples(samples)
  .then(res => console.log(res))
  .then(() => {
    samples.forEach(sample => {
      queryWit(sample.text)
        .then(result => {
          console.log(result)
        });
    });
  });
