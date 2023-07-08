function copyUrl() {
    var url = document.querySelector('.url-container a');
    var range = document.createRange();
    range.selectNode(url);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
  }