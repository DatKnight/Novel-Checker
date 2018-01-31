// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

function loadDataRR(url, id){
  var result = null;
  var origin = 'https://allorigins.me/get?url=' +
  encodeURIComponent(url) +
  'callback=?';
  $.get(origin, function(response){
    var array = response.contents.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}\<\/time> ago/g);
    var num = array.length;
    var lastUpdate = array[num - 1].match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}/)[0];
    updateField(id,num + ' ' + lastUpdate);
  });
}

function updateField(id,content){
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
  updateField('lastTime',getDateTime());
}

window.onload = checkUpdates();
