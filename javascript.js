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

function initializeCheck(){
  loadDataRR('http://royalroadl.com/fiction/8894/everybody-loves-large-chests', 'ELLC');
  loadDataRR('http://royalroadl.com/fiction/5701/savage-divinity', 'SD');
}

window.onload = initializeCheck();
