'use strict';

function toggleToc () {
  $('#viewport').toggleClass('collapsed-toc');
}

function addSharedHtml (pageLinkId) {
  // load navbar and make page link active
  $('#navbar').load('navbar.html', () => {
    $(pageLinkId).addClass('active');
  });
  // load footer
  $('#footer').load('footer.html');
}

function copyLink (event, page) {
  let copyText = `https://molo.ch/${page}#${event.parentNode.id}`;
  // create an input to copy from
  let input = document.createElement('input');
  document.body.appendChild(input);
  input.value = copyText;
  input.select();
  document.execCommand('copy', false);
  input.remove();
}
