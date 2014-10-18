var csv = require('csv');
var fs = require('fs');

var parser = csv.parse;

var nameMap = {
  'pst': 'date'
};

parser(fs.readFileSync('sf-weather.csv'),{
    columns: function(data) {
      return data.map(function(s) {
        s = s.trim();
        s = s.replace(/(f|in|miles|mph|degrees)$/gi, ' $1');
        s = s.toLowerCase();
        var name = s.split(' ').map(function(word, index) {
          if (index == 0) {
            return word
          }
          word = word[0].toUpperCase() + word.substr(1);
          return word;
        }).join('');
        return nameMap[name] || name;
      });
    }
  }, function(err, data) {
    if (err) {
      console.error("error!", err);
    }
    data = data.map(function(datum) {
      datum.events = datum.events ? datum.events.split('-') : [];
      return datum;
    });
    console.error("read data!");
    console.log(JSON.stringify(data, false, 2));
  });