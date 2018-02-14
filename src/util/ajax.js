function post(url, param, success, needAuth) {
  var beforeSend = function(xhr) {};
  if (needAuth) {
    beforeSend = function(xhr) {
      var token = getCookie('token');
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

function put(url, param, success, needAuth) {
  var beforeSend = function(xhr) {};
  if (needAuth) {
    beforeSend = function(xhr) {
      var token = getCookie('token');
      xhr.setRequestHeader("Authorization", token);
    };
  }
  $.ajax({
    type: 'PUT',
    url: 'http://localhost:8088' + url,
    data: param,
    dataType: 'json',
    beforeSend: beforeSend,
    success: success
  });
}

function postWithFile(url, param, success, needAuth) {
  var beforeSend = function(xhr) {};
  if (needAuth) {
    beforeSend = function(xhr) {
      var token = getCookie('token');
      xhr.setRequestHeader("Authorization", token);
    };
  }
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8088' + url,
    data: param,
    beforeSend: beforeSend,
    success: success,
    processData: false,  // 告诉jQuery不要去处理发送的数据
    contentType: false   // 告诉jQuery不要去设置Content-Type请求头
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
