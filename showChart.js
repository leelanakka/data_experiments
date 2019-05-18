const fs = require("fs");
const _ = require("lodash");
const vega = require("vega");
const Papa = require("papaparse");
const asciichart = require("asciichart");
const [, , fileName, columnName] = process.argv;
const column = columnName || "Close Price";
const text = fs.readFileSync(fileName, "utf8").trim();

const quotes = Papa.parse(text, { header: true, dynamicTyping: true }).data;
let values = _.map(quotes, column);
values = values.map(x => +x.split(",").join(""));
const chart = asciichart.plot(values, { height: 40 });
console.log(JSON.stringify(quotes));
fs.writeFileSync("data.json",JSON.stringify(quotes))
console.log(_.map(quotes, q => `${q.Date} ${q[column]}`).join("\n"));
