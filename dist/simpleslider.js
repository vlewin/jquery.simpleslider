/*! Simpleslider - v0.1.0 - 2014-02-28
* https://github.com/vlewin/jquery.simpleslider
* Copyright (c) 2014 Vladislav Lewinn; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.simpleslider = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.simpleslider = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.simpleslider.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.simpleslider.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].simpleslider = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
