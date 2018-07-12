var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]'
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var current = 0;
var imgUrl = ["img/otter1.jpg", "img/otter2.jpg", "img/otter3.jpg", "img/otter4.jpg", "img/otter5.jpg"];
var imgTitle = ["Stayin Alive", "How Deep Is Your Love", "You Should Be Dancing", "Night Fever", "To Love Somebody"];


function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;

  current = imgUrl.indexOf(imageUrl);
  console.log(current);

}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    var thumbArray = getThumbnailsArray();
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addLinkBackHandler() {
  var back_button = document.getElementsByClassName('previous');

  for (var i = 0; i < back_button.length; i++) {
    back_button[i].addEventListener('click', function(event) {
      console.log(back_button);
      event.preventDefault();
      if (current === 0) setDetails(imgUrl[4], imgTitle[4]);
      else setDetails(imgUrl[current - 1], imgTitle[current - 1]);
      showDetails();
    });
  }

}

function addLinkNextHandler() {
  var next_button = document.getElementsByClassName('next');

  for (var i = 0; i < next_button.length; i++) {
    next_button[i].addEventListener('click', function(event) {
      console.log(next_button);
      event.preventDefault();
      if (current === 4) setDetails(imgUrl[0], imgTitle[0]);
      else setDetails(imgUrl[current + 1], imgTitle[current + 1]);
      showDetails();
    });
  }
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
  addLinkBackHandler();
  addLinkNextHandler();
}

initializeEvents();
