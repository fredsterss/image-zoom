var classes = require('classes')
  , css = require('css')
  , Emitter = require('emitter')
  , events = require('events')
  , modal = require('modal');

/**
 * Expose Zoom
 */
module.exports = Zoom;

/**
 * Initialize new Zoom instance
 * @param {Element} element to make zoomable (must be an image)
 * @return {Zoom}
 */
function Zoom (el) {
  if (!(this instanceof Zoom)) return new Zoom(el);
  classes(el).add('zoomable');
  this._margin = 0;
  this.thumb = el;
  this.events = events(this.thumb, this);
  this.bind();

  return this;
}

/**
 * Mixin emitter
 */
Emitter(Zoom.prototype);

/**
 * Sets margin around modal
 * @param  {Number} amount in px
 * @return {Zoom}
 */
Zoom.prototype.margin = function (num) {
  this._margin = num;
  return this;
}

/**
 * Binds click listener
 * @return {Zoom}
 */
Zoom.prototype.bind = function() {
  this.events.bind('click', 'show');
  return this;
}

/**
 * [show description]
 * @return {[type]} [description]
 */
Zoom.prototype.show = function () {
  this.emit('showing');
  this.loadImage();
  return this;
}

/**
 * Load large image
 * @return {Zoom}
 */
Zoom.prototype.loadImage = function () {
  var img = new Image();
  classes(img).add('zoomed-image')
  var self = this;
  img.onload = function() {
    self.showImage(img);
  }
  img.src = this.thumb.src;
  return this;
}

/**
 * Show the image
 * @param  {El} img Element
 * @return {Zoom}
 */
Zoom.prototype.showImage = function (img) {
  this.modal = modal(img)
    .overlay()
    .effect('fade-and-scale')
    .closeable();
  classes(this.modal.el).add('zoomed');
  classes(this.modal._overlay.el).add('zoomed');
  this.modalEvents = events(this.modal.el, this);
  this.modalEvents.bind('click', 'hideModal');
  this.setSize(img, this.modal);
  var self = this;
  this.modal.show(function () { self.emit('shown'); });
}

/**
 * Intelligently set image size
 * @param {Image}
 * @return {Zoom}
 */
Zoom.prototype.setSize = function (image) {
  var width = null
    , height = null
    , xBound = window.innerWidth - (2 * this._margin)
    , yBound = window.innerHeight - (2 * this._margin);

  if (image.width > xBound) {
    width = xBound;
  } else if (image.height > yBound) {
    height = yBound;
  } else {
    width = image.width;
  }
  
  if (width !== null) {
    this.setModalStyle('width', width);
    var ratio = image.width / width;
    this.setModalStyle('margin-top',  -((image.height / ratio) / 2));
  } else if (height !== null) {
    this.setModalStyle('height', height + "px");
    this.setModalStyle('margin-top', "-" + (height / 2) + "px");
  }

  return this;
}

/**
 * Abstraction function to set modal css
 * @param {String} Property string
 * @param {String} Value to set it to
 */
Zoom.prototype.setModalStyle = function (prop, val) {
  css(this.modal.el, prop, val);
  return this;
}

/**
 * Abstraction function to hide the modal, used 
 * due to scope phailz.
 * @return {Zoom}
 */
Zoom.prototype.hideModal = function () {
  this.emit('hiding');
  var self = this;
  this.modal.hide(function () { self.emit('hidden'); });
  return this;
}