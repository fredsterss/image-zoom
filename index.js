var classes = require('classes')
  , css = require('css')
  , Emitter = require('emitter')
  , events = require('events')
  , modal = require('modal');

module.exports = Zoom;

function Zoom (el) {
  if (!(this instanceof Zoom)) return new Zoom(el);

  this.thumb = el;
  this.events = events(this.thumb, this);
  this.bind();

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
  var img = this.cloneImage = new Image();
  var self = this;
  this.cloneImage.onload = function(){
    self.imageWidth = img.width;
    self.imageHeight = img.height;
    self.showOverlay();
  }
  img.src = this.thumb.src;
  return this;
}

Zoom.prototype.showOverlay = function () {
  this.modal = modal(this.cloneImage)
    .overlay()
    .effect('fade-and-scale')
    .closeable();

  this.modalEvents = events(this.modal.el, this);
  this.modalEvents.bind('click', 'hideModal');

  css(this.modal.el, 'margin-top', -(this.imageHeight / 2))
  this.modal.show();
}

Zoom.prototype.hideModal = function () {
  this.modal.hide();
  return this;
}