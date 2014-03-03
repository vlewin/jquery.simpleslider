# SimpleSlider [![Build Status](https://secure.travis-ci.org/vlewin/jquery.simpleslider.png?branch=master)](https://travis-ci.org/vlewin/jquery.simpleslider)

SimpleSlider jQuery plugin with Ruby on Rails integration. 

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/vlewin/jquery.simpleslider/master/dist/simpleslider.min.js
[max]: https://raw.github.com/vlewin/jquery.simpleslider/master/dist/simpleslider.js

In your web page:

```html
<link href="/src/simpleslider.css" rel="stylesheet" />
<script src="jquery.js"></script>
<script src="dist/simpleslider.min.js"></script>
<script>
  $("#simpleslider").simpleslider({
    link_selector: '.slider-link',
    back_link_selector : '.back',
    breadcrumb_selector: '#breadcrumb',
    breadcrumb: true
  });
</script>
```

## Documentation
_(Coming soon)_

## Examples
```html
  <body>
    <ul id="breadcrumb"></ul>
    <div id="simpleslider">
    <ul>
      <li>
        First page (index page)
        <a href="/posts/1" data-title="Title 1" data-target="#1" data-no-turbolink="true" data-id="1" class="slink">Show</a>
      </li>
      <li>
        Last page (details page)
        <a href="/posts" class="back">Back</a>
      </li>
    </ul>
  </body>
```

## Release History
_(Nothing yet)_
