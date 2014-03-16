# image-zoom

Simple image zooming component that zooms the image to full size, or to the screen size. [Demo](http://image-zoom.brace.io/).

Lightweight by virtue of being built on top of [segmentio/modal](https://github.com/segmentio/modal).

### Usage

Require zoom:

```javascript
var zoom = require('image-zoom');
```
To zoomify a [single image](http://image-zoom.brace.io/):

```javascript
var z = new zoom(document.querySelector('img')).margin(20);
```

Multiple [images](http://image-zoom.brace.io/example-multiple.html):

```javascript
var thumbs = document.querySelectorAll('img');
for (i = 0; i < thumbs.length; i++) {
  var z = new Zoom(thumbs[i]).margin(20);
}
```
