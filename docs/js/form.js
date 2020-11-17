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
  var requestPath = '4DAction/api_put_project';
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

  var hostInput = document.querySelector('input[name=host]');
  if (hostInput && params['host'] && params['host'].match(/(^http(s?)):\/\/(.*)\//)) {
    hostInput.value = params['host'];
    form.action = params['host'] + '/' + requestPath;
  } else {
    var origin = window.location.origin;
    form.action = origin + '/' + requestPath;
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
