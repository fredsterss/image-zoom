// TODO:
//  - event emitting
//  - dynamic classes
var classes = require('classes')
  , css = require('css')
  , Emitter = require('emitter')
  , events = require('events')
  , modal = require('modal');

var defaults = {
  padding: 20
}

module.exports = Zoom;

function Zoom (el) {
  if (!(this instanceof Zoom)) return new Zoom(el);
  classes(el).add('zoomable');
  this._margin = 0;
  this.thumb = el;
  this.events = events(this.thumb, this);
  this.bind();

  return this;
}

Zoom.prototype.padding = function (num) {
  this._margin = num;
  return this;
}

Zoom.prototype.bind = function() {
  this.events.bind('click', 'show');
  return this;
}

Zoom.prototype.show = function () {
  this.loadImage();
  return this;
}

Zoom.prototype.loadImage = function () {
  var img = new Image();
  classes(img).add('zoomed-image')
  var self = this;
  img.onload = function() {
    self.showOverlay(img);
  }
  img.src = this.thumb.src;
  return this;
}

Zoom.prototype.showOverlay = function (img) {
  this.modal = modal(img)
    .overlay()
    .effect('fade-and-scale')
    .closeable();
  classes(this.modal.el).add('zoomed');
  classes(this.modal._overlay.el).add('zoomed');

  this.modalEvents = events(this.modal.el, this);
  this.modalEvents.bind('click', 'hideModal');
  this.setSize(img, this.modal);
  this.modal.show();
}

Zoom.prototype.setSize = function (image, modal) {
  var width = null
    , height = null
    , xBound = window.innerWidth - (2 * this._margin)
    , yBound = window.innerHeight - (2 * this._margin);

  // If width is bigger than max set it to windowWidth - padding
  if (image.width > xBound) {
    width = xBound;
  } else if (image.height > yBound) {
    height = yBound;
  } else {
    width = image.width;
  }
  
  if (width !== null) {
    this.setModalStyle(modal, 'width', width);
    var ratio = image.width / width;
    this.setModalMargin(modal, image.height / ratio);
  } else if (height !== null) {
    this.setModalStyle(modal, 'height', height);
    this.setModalMargin(modal, height);
  }
}

Zoom.prototype.setModalStyle = function (modal, prop, val) {
  console.log(modal.el, prop, val);
  css(modal.el, prop, val);
  return this;
}

Zoom.prototype.setModalMargin = function (modal, imageHeight) {
  console.log(imageHeight);
  css(modal.el, 'margin-top', -(imageHeight / 2));
}

Zoom.prototype.willOverlapWindow = function (width, height) {
  if (width > window.innerWidth) { return true; } 
  else if (height > window.innerHeight) { return true; }
  return false;
}

Zoom.prototype.hideModal = function () {
  this.modal.hide();
  return this;
}