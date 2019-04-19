const fs = require('fs');
const _ = require('lodash');
const Papa = require('papaparse');
const asciichart = require ('asciichart')
const [,,fileName,columnName] = process.argv;
const column = columnName ||' Close Price';
const text = fs.readFileSync(fileName,'utf8').trim();
const quotes = Papa.parse(text,{header:true,dynamicTyping:true}).data;
const values = _.map(quotes,column);
const chart = asciichart.plot(values,{height:40});
console.log(chart);
console.log(_.map(quotes,q=>`${q.Date} ${q[column]}`).join('\n'));
