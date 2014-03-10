# image-zoom

Simple image zooming component that zooms the image to full size, or to the screen size. 

Lightweight by virtue of being built on top of [segmentio/modal](https://github.com/segmentio/modal).

## Usage

```javascript
var zoom = require('image-zoom');
var z = new zoom(document.querySelector('img'));
z.margin(20);
```