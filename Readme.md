# image-zoom

Simple image zooming component that zooms the image to full size, or to the screen size. 

Lightweight by virtue of being built on top of [segmentio/modal](https://github.com/segmentio/modal).

### Usage

Require zoom:

```javascript
var zoom = require('image-zoom');
```
To zoomify a single image:

```javascript
var z = new zoom(document.querySelector('img')).margin(20);
```

Multiple images:

```javascript
var thumbs = document.querySelectorAll('img');
for (i = 0; i < thumbs.length; i++) {
  var z = new Zoom(thumbs[i]).margin(20);
}
```
