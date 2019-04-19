const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const Papa = require('papaparse');
const url = (symbol) => `https://www.nseindia.com/products/dynaContent/common/productsSymbolMapping.jsp?symbol=${symbol}&segmentLink=3&symbolCount=2&series=EQ&dateRange=1month&fromDate=&toDate=&dataType=PRICEVOLUMEDELIVERABLE`;
const [,,symbol] = process.argv;
const downloadHtml = (symbol,onHtml)=>{
  request({
    url:url(symbol),
    headers:{
      'user-agent': 'Mozilla 5.0'
    }
  },(err,res,body)=>{
    onHtml(body);
  });
}

//downloadHtml(symbol,readQuotes);
const html = fs.readFileSync('reliance.html','utf8');
const $ = cheerio.load(html);
const quotes = [];
const names = [];
$('table tbody tr th').each(function(){
  names.push($(this).text().trim());
});
//console.log(names);

$('table tbody tr:has(td)').each(function(){
  const tr = this;
  const quote = {};
  $('td',tr).each(function(index){
    const td = this;
    quote[names[index]] = $(td).text();
  })
  quotes.push(quote);
});
console.log(quotes);
const text = Papa.unparse(quotes);
console.log(text);
