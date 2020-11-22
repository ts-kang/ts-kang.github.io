window.onload = function() {
  document.body.style.backgroundColor = '#dddddd';

  if(window.location.href.indexOf('http://') === 0)
    window.location.href = window.location.href.replace('http://', 'https://');
}
