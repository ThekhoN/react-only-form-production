const xhrPOSThandler = (url, params, callback) => {
  //console.log('passed params: ', params)
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("authorization", "Basic Y3JlZGl0Y2FyZDpmYXRSdXN3YSN1czg=");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {

    console.info('POST SUCCESSFUL xhr.responseText: ', xhr.responseText);
    //do something with the returnedResponseText
    if(callback){
      callback(xhr.responseText);
    }
  }
  };
  xhr.onerror = function(err) {
  console.log('there was an error with the POST: ', err);
  };
  xhr.send(params);
}

export default xhrPOSThandler
