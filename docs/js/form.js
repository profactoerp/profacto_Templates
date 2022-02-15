var submitForm = function(url) {
  var form = document.querySelector('form');
  form.action = url;
  form.submit();
}

var fetchGetParams = function(string) {
  var raw = string.split('&');
  var params = {};
  raw.forEach((param) => {
    var value = param.split('=');
    params[value[0]] = value[1];
  });

  return params;
}

window.addEventListener('load', function(event) {
  var requestPath = '4DAction/';
  var port = 8080;
  var defaultProtocol = 'http';

  var params = fetchGetParams(window.location.search.substr(1));
  var form = document.querySelector('form');

  if (params['token'] != undefined) {
    document.querySelector('input[name=token]').value = params['token'];
  }

  if (window.location.port == '8080') {
    var host = document.querySelector('input[name=host]');
    if (host) {
      host.parentElement.parentElement.remove();
    }
  }

  var setFormAction = function(event) {
    var value = hostInput.value;
    var result = value.match(/(^http(s?)|(^ftp)|(^file))?(:\/\/)?([a-zA-Z0-9\.]*)(:8080)?/);
    var host = result.length >= 8 ? result[6] : value;
    var protocol = result.length >= 1 && result[1] != undefined ? result[1] :  defaultProtocol;

    form.action = protocol + '://' + host + ':' + port + '/' + requestPath + method;
  }

  var hostInput = document.querySelector('input[name=host]');
  hostInput.addEventListener('change', setFormAction);
  hostInput.addEventListener('blur', setFormAction);

  if (hostInput && params['host'] && params['host'].match(/(^http(s?)|(^ftp)|(^file))?(:\/\/)?([a-zA-Z0-9\.]*)(:8080)?/)) {
      var value = hostInput.value;
      var result = value.match(/(^http(s?)|(^ftp)|(^file))?(:\/\/)?([a-zA-Z0-9\.]*)(:8080)?/);
      var host = result.length >= 8 ? result[6] : value;
      var protocol = result.length >= 1 && result[1] != undefined ? result[1] :  defaultProtocol;

      hostInput.value = result.length >= 8 && result[6] != undefined ? result[6] : hostPinput.value;
      form.action = protocol + '://' + host + ':' + port + '/' + requestPath;
  } else {
      var result = window.location.href.match(/(^http(s?)|(^ftp)|(^file))?(:\/\/)?([a-zA-Z0-9\.]*)(:8080)?/);
      var host = result.length >= 8 ? result[6] : value;
      var protocol = result.length >= 1 ? result[1] :  defaultProtocol;

      form.action = protocol + '://' + host + ':' + port + '/' + requestPath + method;
  }

  form.addEventListener('submit', (event) => {
    if (hostInput) {
      var hostValue = hostInput.value;
      if (hostValue && hostValue.match(/(^http(s?)):\/\/(.*)\//)) {
        form.action = hostValue + requestPath;
      }
    }
  });

  document.querySelectorAll('header > dl.description-header, header > dl.description').forEach((node) => {
    node.addEventListener('click', (event) => {
      var descriptionContainer = document.querySelector('header > dl.description');
      if (descriptionContainer.classList.contains('open')) {
        descriptionContainer.classList.remove('open');
      }
      else {
        descriptionContainer.classList.add('open');
      }
    });
  });
});
