function post(url, param, success, needAuth) {
  var beforeSend = function(xhr) {};
  if (needAuth) {
    beforeSend = function(xhr) {
      var token = getCookie('token');
      console.log(token);
      xhr.setRequestHeader("Authorization", token);
    };
  }
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8088' + url,
    data: param,
    dataType: 'json',
    beforeSend: beforeSend,
    success: success
  });
}

function get(url, param, success) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8088' + url,
    data: param,
    dataType: 'json',
    success: success
  });
}
