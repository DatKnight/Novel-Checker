// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

function loadDataRR(url, id){
  var origin = 'https://allorigins.me/get?url=' +
  encodeURIComponent(url) +
  'callback=?';
  $.get(origin, function(response){
    var array = response.contents.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}\<\/time> ago/g);
    var num = array.length;
    var lastUpdate = array[num - 1].match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}/)[0];
    updateField(id,num,lastUpdate);
  });
}

function loadDataAO3(url, id){
  var origin = 'https://allorigins.me/get?url=' +
  encodeURIComponent(url) +
  'callback=?';
  $.get(origin, function(response){
    var array = response.contents.match(/Updated:.+"chapters"\>[0-9]{1,3}/);
    var num = array[0].match(/"chapters"\>[0-9]{1,3}/)[0];
    var num = num.match(/[0-9]{1,3}/)[0];
    var lastUpdate = array[0].match(/[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,4}/)[0]
    updateField(id,num,lastUpdate);
  });
}

function loadDataFP(url, id){
  var origin = 'https://allorigins.me/get?url=' +
  encodeURIComponent(url) +
  'callback=?';
  $.get(origin, function(response){
    var array = response.contents.match(/<span class="xgray xcontrast_txt"\> == \$0 .+ Published:/);
    console.log(array);
    //var num = array.length;
    //var lastUpdate = array[num - 1].match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}/)[0];
    //updateField(id,num + ' ' + lastUpdate);
  });
}

function loadDataGeneric(url, id, regex){
  var origin = 'https://allorigins.me/get?url=' +
  encodeURIComponent(url) +
  'callback=?';
  $.get(origin, function(response){
    var array = response.contents.match(regex);
    var num = array[0];
    updateField(id,num);
  });
}

function updateField(id,chapter,date){
  current = document.getElementById(id);
  document.getElementById(id).innerHTML = 'Current Chapter: ' + chapter + ' Last Updated: ' + date;
}

function updateDateField(id,content){
  current = document.getElementById(id);
  document.getElementById(id).innerHTML = content;
}

function getDateTime(){
  var currentDateTime = new Date;
  return 'Last Check: ' + currentDateTime.today() + ' @ ' + currentDateTime.timeNow();
}

function checkUpdates(){
  loadDataRR('http://royalroadl.com/fiction/8894/everybody-loves-large-chests', 'ELLC');
  loadDataRR('http://royalroadl.com/fiction/5701/savage-divinity', 'SD');
  loadDataAO3('http://archiveofourown.org/works/11478249/chapters/25740126','WTC');
  updateDateField('lastTime',getDateTime());
}

window.onload = checkUpdates();
